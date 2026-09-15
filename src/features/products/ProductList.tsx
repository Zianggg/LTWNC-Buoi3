import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addItem } from '../cart/cartSlice';
import { useGetProductsQuery } from './productsApi';
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from './productsSlice';

const formatPrice = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

export function ProductList() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading' || status === 'idle') {
    return <p className="text-sm text-slate-600">Đang tải danh sách sản phẩm…</p>;
  }

  if (status === 'failed') {
    return (
      <div className="grid gap-3">
        <p className="text-sm text-red-700">{error ?? 'Không tải được sản phẩm'}</p>
        <button
          type="button"
          className="w-fit rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={() => {
            void dispatch(fetchProducts());
          }}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((product) => (
          <li key={product.id} className="grid gap-3 rounded-md border border-slate-200 bg-white p-3">
            <img
              src={product.image}
              alt=""
              className="h-36 w-full rounded-md bg-slate-200 object-cover"
            />
            <div className="grid gap-1">
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-slate-600">{product.description}</p>
              <p className="text-sm tabular-nums text-slate-700">{formatPrice.format(product.price)}</p>
            </div>
            <button
              type="button"
              className="rounded-md bg-blue-700 px-3 py-1.5 text-sm text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => {
                dispatch(
                  addItem({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  }),
                );
              }}
            >
              Thêm vào giỏ
            </button>
          </li>
        ))}
      </ul>
      <RtkQueryHint />
    </div>
  );
}

function RtkQueryHint() {
  const query = useGetProductsQuery();
  const label = query.isLoading
    ? 'đang cache'
    : query.isSuccess
      ? `đã cache ${query.data.length} sản phẩm`
      : query.isError
        ? 'không cache được'
        : 'chưa gọi';

  return <p className="text-xs text-slate-500">Điểm cộng RTK Query: {label}</p>;
}
