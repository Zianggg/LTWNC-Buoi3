import { ProductList } from './features/products/ProductList';
import { CartSummary } from './features/cart/CartSummary';
import { useAppSelector } from './app/hooks';
import { selectCartTotalQuantity } from './features/cart/cartSlice';

export default function App() {
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-5 pt-10 pb-16">
      <header className="grid gap-1 border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-semibold">Bài tập về nhà — Buổi 3</h1>
        <p className="text-sm text-slate-600">
          Module giỏ hàng Redux Toolkit: cartSlice, productsSlice (createAsyncThunk) và RTK Query.
        </p>
        <p className="text-sm text-slate-700">
          Giỏ hàng hiện có <span className="font-medium tabular-nums">{totalQuantity}</span> sản phẩm
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="rounded-md border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Sản phẩm</h2>
          <p className="mt-1 mb-4 text-sm text-slate-600">
            Danh sách lấy từ API giả <code className="rounded bg-slate-100 px-1">/api/products</code> bằng
            createAsyncThunk.
          </p>
          <ProductList />
        </section>

        <section className="rounded-md border border-slate-200 bg-white p-6 lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold">Giỏ hàng</h2>
          <p className="mt-1 mb-4 text-sm text-slate-600">Thêm, xoá và đổi số lượng — mọi thao tác đi qua Redux.</p>
          <CartSummary />
        </section>
      </div>
    </div>
  );
}
