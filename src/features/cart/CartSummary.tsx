import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeItem,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  updateQuantity,
} from './cartSlice';

const formatPrice = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

export function CartSummary() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const totalAmount = useAppSelector(selectCartTotalAmount);

  if (items.length === 0) {
    return <p className="text-sm text-slate-600">Giỏ hàng trống. Thêm sản phẩm từ danh sách bên cạnh.</p>;
  }

  return (
    <div className="grid gap-4">
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item.id} className="grid gap-2 rounded-md border border-slate-200 bg-white p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm tabular-nums text-slate-600">{formatPrice.format(item.price)}</p>
              </div>
              <button
                type="button"
                className="text-sm text-red-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => dispatch(removeItem(item.id))}
              >
                Xoá
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="grid h-8 w-8 place-items-center rounded-md border border-slate-300 bg-white text-lg leading-none hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                aria-label={`Giảm số lượng ${item.title}`}
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
              >
                −
              </button>
              <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
                {item.quantity}
              </span>
              <button
                type="button"
                className="grid h-8 w-8 place-items-center rounded-md border border-slate-300 bg-white text-lg leading-none hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                aria-label={`Tăng số lượng ${item.title}`}
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="grid gap-1 border-t border-slate-200 pt-3 text-sm">
        <p className="flex justify-between tabular-nums">
          <span>Tổng số lượng</span>
          <span>{totalQuantity}</span>
        </p>
        <p className="flex justify-between font-medium tabular-nums">
          <span>Tổng tiền</span>
          <span>{formatPrice.format(totalAmount)}</span>
        </p>
      </div>
    </div>
  );
}
