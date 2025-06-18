import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { graphqlRequest } from '../utils/api';
import {
  Box,
  Typography,
  CircularProgress,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Divider,
  Paper,
} from '@mui/material';

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
        }
      }
    }
  }
`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await graphqlRequest(PRODUCTS_QUERY, {}, token);
        const found = res.data.getVTEXProducts.find(
          p => String(p.productId) === String(id)
        );
        setProduct(found);
      } catch (err) {
        console.error('Error al buscar el producto', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={5}>
        Producto no encontrado.
      </Typography>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detalle del Producto
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              image={product.items?.[0]?.images?.[0]?.imageUrl}
              alt={product.productName}
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 2
              }}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <CardContent sx={{ px: 0 }}>
              <Typography variant="h6" gutterBottom>ID del producto</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{product.productId}</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>Nombre</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{product.productName}</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>Marca</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{product.brand}</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>Items</Typography>
              <Typography variant="body1">
                {product.items.map(i => i.itemId).join(', ')}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              textTransform: 'none',
              px: 4,
              py: 1.2
            }}
          >
            Volver
          </Button>

          <Button
            variant="contained"
            color="warning"
            onClick={() => window.print()}
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              px: 4,
              py: 1.2
            }}
          >
            Imprimir
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
