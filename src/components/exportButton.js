import React from 'react';
import { Button } from '@mui/material';

export default function ExportCSVButton({ selectedRows }) {
  const handleExport = () => {
    if (!selectedRows || selectedRows.length === 0) {
      alert('Selecciona al menos un producto');
      return;
    }

    const header = 'Product ID,Name,Brand,Item IDs';
    const rows = selectedRows.map(p =>
      `${p.productId},${p.productName},${p.brand},"${p.items.map(i => i.itemId).join(' | ')}"`
    );

    const blob = new Blob([header + '\n' + rows.join('\n')], {
      type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'productos.csv';
    a.click();
  };

  return (
    <Button
      variant="contained"
      color="warning"
      onClick={handleExport}
    >
      Exportar seleccionados
    </Button>
  );
}
