import React, { useEffect, useState } from 'react';
import { graphqlRequest } from '../utils/api';
import ProductCardList from '../components/productCard';
import { Typography, Grid, Skeleton, Box } from '@mui/material';

const PRODUCTS_QUERY = `
  query {
    getVTEXProducts {
      productId
      productName
      brand
      items {
        itemId
        name
        images {
          imageUrl
          imageText
        }
      }
    }
  }
`;

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await graphqlRequest(PRODUCTS_QUERY, {}, token);
        setProducts(res.data.getVTEXProducts);
      } catch (err) {
        console.error('Error al cargar productos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Productos de VTEX
      </Typography>

      {loading ? (
        <Grid container spacing={5} justifyContent="center">
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item key={index}>
              <Box
                sx={{
                  width: 300,
                  height: 360,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Skeleton variant="rectangular" height={160} />
                <Box padding={2} sx={{ flexGrow: 1 }}>
                  <Skeleton height={20} width="60%" sx={{ mb: 1 }} />
                  <Skeleton height={30} width="80%" sx={{ mb: 1 }} />
                  <Skeleton height={20} width="70%" sx={{ mb: 1 }} />
                  <Skeleton height={20} width="90%" />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <ProductCardList products={products} />
      )}
    </Box>
  );
}
