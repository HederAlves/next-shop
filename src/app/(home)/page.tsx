import { Suspense } from 'react';
import Home from '@/components/pages/Home';

export default function HomePage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Home />
        </Suspense>
    );
}
