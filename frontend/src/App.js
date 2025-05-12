import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import LoginScreen from './screens/LoginScreen';
import BookRoom from './screens/BookRoom';
import AddRoom from './screens/AddRoom';
import StaffScreen from './screens/StaffScreen';
import ExpenseScreen from './screens/ExpenseScreen';
import CustomerHistory from './screens/CustomerHistory';
import Accountability from './screens/Accountability';
import BalanceSheetScreen from './screens/BalanceSheetScreen';
import './App.css';

import { BookingProvider } from './context/BookingContext'; // ✅ Import the context

function AppContent() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <>
      {!isLogin && <Navbar />}
      <div className={isLogin ? '' : 'd-flex'}>
        {!isLogin && <Sidebar />}

        <div
          className="flex-grow-1"
          style={{ marginLeft: isLogin ? 0 : 220, padding: isLogin ? 0 : '20px' }}
        >
          <Routes>
            {/* public */}
            <Route path="/login" element={<LoginScreen />} />

            {/* protected */}
            <Route
              path="/book-room"
              element={
                <PrivateRoute>
                  <BookRoom />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-room"
              element={
                <PrivateRoute>
                  <AddRoom />
                </PrivateRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <PrivateRoute>
                  <StaffScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <PrivateRoute>
                  <ExpenseScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/customer-history"
              element={
                <PrivateRoute>
                  <CustomerHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/accountability"
              element={
                <PrivateRoute>
                  <Accountability />
                </PrivateRoute>
              }
            />
            <Route
              path="/balance-sheet"
              element={
                <PrivateRoute>
                  <BalanceSheetScreen />
                </PrivateRoute>
              }
            />

            {/* fallback to login */}
            <Route path="*" element={<LoginScreen />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BookingProvider> {/* ✅ Wrap everything in the BookingProvider */}
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </BookingProvider>
  );
}
