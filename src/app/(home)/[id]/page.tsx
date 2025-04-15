import { Suspense } from 'react';
import Product from '@/components/pages/Product';

export default function ProductPage() {
    return (
        <Suspense fallback={<div>Carregando produto...</div>}>
            <Product />
        </Suspense>
    );
}
