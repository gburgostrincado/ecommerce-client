import { BrowserRouter, Route, Routes } from 'react-router'
import ProductPage from './features/products/ProductsPage'
import CartPage from './features/carts/CartPage'
import Header from './components/Header'
import ProductDetailPage from './features/products/ProductDetailPage'
import CheckoutPage from './features/checkout/CheckoutPage'
import SuccessPage from './features/checkout/SuccessPage'
import CancelPage from './features/checkout/CancelPage'
import OrdersPage from './features/orders/OrdersPage'

function App() {
  return (
    <BrowserRouter>
    <Header /> 
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment/success" element={<SuccessPage />} />
      <Route path="/payment/cancel" element={<CancelPage />} />
      <Route path="/orders" element={<OrdersPage />} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
