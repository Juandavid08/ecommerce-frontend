import React, { useState, useMemo } from 'react';
import {
  Card, CardContent, Typography,
  Grid, Box, Checkbox, TextField,
  Pagination
} from '@mui/material';
import ExportCSVButton from './exportButton';
import { useNavigate } from 'react-router-dom';

export default function ProductCardList({ products = [] }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return products.filter(p =>
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.productId.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSelect = (productId) => {
    setSelected((prev) =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectedProducts = products.filter(p => selected.includes(p.productId));

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Buscar producto..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <ExportCSVButton selectedRows={selectedProducts} />
      </Box>

      <Grid container spacing={5} justifyContent="center">
        {paginated.map((product) => (
          <Grid item key={product.productId}>
            <Card
              onClick={() => navigate(`/producto/${product.productId}`)}
              sx={{
                width: 300,
                height: 360,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ccc',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: 4,
                  zIndex: 10,
                  cursor: 'pointer'
                },
                '&:hover .hoverOverlay': {
                  opacity: 1
                }
              }}
            >
              <Checkbox
                checked={selected.includes(product.productId)}
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleSelect(product.productId)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 2,
                  color: '#ffdb00',
                  '&.Mui-checked': {
                    color: '#ffdb00'
                  }
                }}
              />

              <Box
                sx={{
                  height: 160,
                  width: '100%',
                  backgroundImage: `url(${product.items?.[0]?.images?.[0]?.imageUrl || ''})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  borderBottom: '1px solid #eee'
                }}
              />

              <CardContent
                sx={{
                  height: 200,
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden'
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  title={product.productId}
                >
                  ID: {product.productId}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    height: '2.4em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={product.productName}
                >
                  {product.productName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  title={product.brand}
                >
                  Marca: {product.brand}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={product.items?.map(i => i.itemId).join(', ')}
                >
                  Items: {product.items?.map(i => i.itemId).join(', ')}
                </Typography>
              </CardContent>

              <Box
                className="hoverOverlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 1
                }}
              >
                <Typography
                  variant="button"
                  sx={{
                    backgroundColor: '#ffdb00',
                    color: '#000',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontWeight: 'bold'
                  }}
                >
                  Ver más detalles
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#ffdb00',
                border: '1px solid #ffdb00',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#ffdb00',
                color: '#000',
                border: '1px solid #ffdb00',
                '&:hover': {
                  backgroundColor: '#ffdb00'
                }
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
}
