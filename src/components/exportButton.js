import React from 'react';
import { Button } from '@mui/material';

export default function ExportCSVButton({ selectedRows }) {
  const handleExport = () => {
    if (!selectedRows || selectedRows.length === 0) {
      alert('Selecciona al menos un producto');
      return;
    }

    const header = ['Id Producto', 'Nombre', 'Marca', 'Items'];

    const escapeCSV = (value) => {
      const str = String(value).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = selectedRows.map(p => {
      const itemIds = p.items.map(i => i.itemId).join(', ');
      return [
        p.productId,
        escapeCSV(p.productName),
        escapeCSV(p.brand),
        escapeCSV(itemIds)
      ].join(';');
    });

    const csvContent = [header.join(';'), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

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
