const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Models
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Staff = require('./models/staff');
const Expense = require('./models/Expense');

// In-memory users (for demo only)
const USERS = [
  { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com' },
  { id: 2, username: 'manager', password: 'manager123', email: 'manager@example.com' },
];
let nextUserId = 3;

// Add Room
router.post('/rooms', async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.send(room);
});

// Get available Rooms (not already booked)
router.get('/rooms', async (req, res) => {
  const rooms = await Room.find();
  const bookings = await Booking.find();

  const occupiedRooms = new Set();
  bookings.forEach(b => occupiedRooms.add(b.roomNo));

  const availableRooms = rooms.filter(r => !occupiedRooms.has(r.roomNo));
  res.send(availableRooms);
});

// Book a Room
router.post('/bookings', async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.send(booking);
});

// Get all Bookings with optional sorting
router.get('/bookings', async (req, res) => {
  const sortBy = req.query.sortBy;
  const order = req.query.order === 'desc' ? -1 : 1;

  let sortOptions = {};
  if (sortBy === 'name') {
    sortOptions = { customerName: order };
  } else if (sortBy === 'room') {
    sortOptions = { roomNo: order };
  } else {
    sortOptions = { checkInTime: order };
  }

  try {
    const bookings = await Booking.find().sort(sortOptions);
    res.send(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Profit by Day, Month, Year
router.get('/profits', async (req, res) => {
  const bookings = await Booking.find();
  const rooms = await Room.find();
  const roomMap = {};

  rooms.forEach(room => {
    roomMap[room.roomNo] = room.price;
  });

  const summary = { byDay: {}, byMonth: {}, byYear: {} };

  bookings.forEach(b => {
    const date = new Date(b.checkInTime);
    const price = roomMap[b.roomNo] || 0;
    const profit = (price / 24) * (b.hours || 0);

    const dayKey = date.toISOString().split('T')[0];
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    const yearKey = date.getFullYear().toString();

    summary.byDay[dayKey] = (summary.byDay[dayKey] || 0) + profit;
    summary.byMonth[monthKey] = (summary.byMonth[monthKey] || 0) + profit;
    summary.byYear[yearKey] = (summary.byYear[yearKey] || 0) + profit;
  });

  res.json(summary);
});

// ✅ Register Route
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const existingUser = USERS.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Username already exists' });
  }

  USERS.push({ id: nextUserId++, username, password, email });
  return res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = USERS.find(u => u.username === identifier);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Expenses
router.post('/expenses', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Expense Summary
router.get('/expense-summary', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const summary = { byDay: {}, byMonth: {} };

    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const amount = exp.amount;
      const dayKey = date.toISOString().split('T')[0];
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      summary.byDay[dayKey] = (summary.byDay[dayKey] || 0) + amount;
      summary.byMonth[monthKey] = (summary.byMonth[monthKey] || 0) + amount;
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Staff
router.post('/staff', async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    let staff;
    if (_id) {
      staff = await Staff.findByIdAndUpdate(_id, rest, { new: true });
    } else {
      staff = new Staff(rest);
      await staff.save();
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/staff', async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Balance Sheet
router.get('/balance-sheet', async (req, res) => {
  try {
    const bookings = await Booking.find();
    const rooms = await Room.find();
    const expenses = await Expense.find();

    const roomMap = {};
    rooms.forEach(room => {
      roomMap[room.roomNo] = room.price;
    });

    const profitSummary = { byDay: {}, byMonth: {} };
    bookings.forEach(b => {
      const date = new Date(b.checkInTime);
      const price = roomMap[b.roomNo] || 0;
      const profit = (price / 24) * (b.hours || 0);

      const dayKey = date.toISOString().split('T')[0];
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      profitSummary.byDay[dayKey] = (profitSummary.byDay[dayKey] || 0) + profit;
      profitSummary.byMonth[monthKey] = (profitSummary.byMonth[monthKey] || 0) + profit;
    });

    const expenseSummary = { byDay: {}, byMonth: {} };
    expenses.forEach(exp => {
      const date = new Date(exp.date);
      const amount = exp.amount;
      const dayKey = date.toISOString().split('T')[0];
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      expenseSummary.byDay[dayKey] = (expenseSummary.byDay[dayKey] || 0) + amount;
      expenseSummary.byMonth[monthKey] = (expenseSummary.byMonth[monthKey] || 0) + amount;
    });

    const balanceByDay = {};
    const balanceByMonth = {};

    const allDays = new Set([...Object.keys(profitSummary.byDay), ...Object.keys(expenseSummary.byDay)]);
    allDays.forEach(day => {
      const profit = profitSummary.byDay[day] || 0;
      const expense = expenseSummary.byDay[day] || 0;
      balanceByDay[day] = { profit, expense, net: profit - expense };
    });

    const allMonths = new Set([...Object.keys(profitSummary.byMonth), ...Object.keys(expenseSummary.byMonth)]);
    allMonths.forEach(month => {
      const profit = profitSummary.byMonth[month] || 0;
      const expense = expenseSummary.byMonth[month] || 0;
      balanceByMonth[month] = { profit, expense, net: profit - expense };
    });

    res.json({ byDay: balanceByDay, byMonth: balanceByMonth });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;