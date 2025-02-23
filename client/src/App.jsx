import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import Home from './pages/Home';
import { Toaster } from 'sonner'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/products/ProductDetails';
import Checkout from './components/cart/Checkout';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrderspage';
import AdminLayout from './components/admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import EditProductPage from './components/admin/EditProductPage';

function App() {
  return (
    <BrowserRouter>
    <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/collections/:collection' element={<CollectionPage />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
          <Route path='/order/:id' element={<OrderDetailsPage />} />
          <Route path='/my-orders' element={<MyOrdersPage />} />
        </Route>
        <Route path='/admin'element={<AdminLayout />} >
        <Route index element={<AdminHomePage />} />
        <Route path='users' element={<UserManagement />} />
        <Route path='products' element={<ProductManagement />} />
        <Route path='products/:id/edit' element={<EditProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;