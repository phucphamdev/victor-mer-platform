'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatPrice } from '@/lib/api';
import styles from './cart.module.css';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    alert('Chức năng thanh toán đang được phát triển!');
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Giỏ hàng của bạn</h1>
          {items.length > 0 && (
            <button className={styles.clearButton} onClick={clearCart}>
              Xóa tất cả
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛒</div>
            <p>Giỏ hàng của bạn đang trống</p>
            <button onClick={() => router.push('/products')} className={styles.shopButton}>
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.product.id} className={styles.cartItem}>
                  <div 
                    className={styles.itemImage}
                    onClick={() => router.push(`/products/${item.product.id}`)}
                  >
                    {item.product.image || '📦'}
                  </div>
                  <div className={styles.itemInfo}>
                    <h3 onClick={() => router.push(`/products/${item.product.id}`)}>
                      {item.product.name}
                    </h3>
                    <p>{item.product.description}</p>
                    <p className={styles.unitPrice}>
                      Đơn giá: {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className={styles.itemQuantity}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        updateQuantity(item.product.id, val);
                      }}
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={
                        item.product.stock !== undefined &&
                        item.quantity >= item.product.stock
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className={styles.itemPrice}>
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeItem(item.product.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h2>Tổng đơn hàng</h2>
              <div className={styles.summaryRow}>
                <span>Tạm tính:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Giảm giá:</span>
                <span>0 ₫</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Tổng cộng:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <button className={styles.checkoutButton} onClick={handleCheckout}>
                Thanh toán
              </button>
              <button
                className={styles.continueButton}
                onClick={() => router.push('/products')}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
