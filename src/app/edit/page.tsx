import { Suspense } from 'react';

import EditPageContent from './EditPageContent';

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPageContent />
    </Suspense>
  );
}
