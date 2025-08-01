import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '../Routes';
import ProductDetails from './screens/ProductDetails';
import Footer from './components/Footer';
import Men from './screens/Men';
import Women from './screens/Women';
import Couple from './screens/Couple';
import Product from './screens/Product';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Account from './screens/Account';
import PrivateRoute from './screens/PrivateRoute';
import PaymentPage from './screens/Payment';
import Verify from './screens/Verify';
import ResetPass from './screens/ResetPass';
import ForgotPass from './screens/ForgotPass';
import NotFound from './screens/NotFound';


const App = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <BrowserRouter>

                <Header />

                {/* Main Content Area */}
                <main className="flex-grow">
                    <Routes>
                        {routes.map(({ path, screen }, index) => (
                            <Route key={index} path={path} element={screen} />
                        ))}
                        <Route path='/products' element={<Product />}>
                            <Route path='/products/men' element={<Men />} />
                            <Route path='/products/women' element={<Women />} />
                            <Route path='/products/couple' element={<Couple />} />
                        </Route>
                        <Route path='/signup' element={<Account />} />
                        <Route path='/verify' element={<Verify />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/product-details/:id' element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
                        <Route path='/payment' element={<PaymentPage />} />
                        <Route path="/forgot-password" element={<ForgotPass />} />
                        <Route path="/reset-password" element={<ResetPass />} />
                        <Route path="/cart" element={
                            <PrivateRoute>
                                <Cart />
                            </PrivateRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
