import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../store/products';
import { addToCart } from '../../store/cart';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardActions, Button, Typography, CardMedia } from '@material-ui/core';

const Products = ({ activeCategory, products, getProducts, addToCart }) => {
  useEffect(() => { if (activeCategory) getProducts(activeCategory); }, [activeCategory, getProducts]);

  return (
    <Grid container spacing={4}>
      {products.map(p => (
        <Grid item xs={12} sm={6} md={4} key={p.id}>
          <Card>
            <CardMedia style={{ height: 200 }} image={p.image} title={p.name} />
            <CardContent>
              <Typography variant="h6">{p.name}</Typography>
              <Typography>{p.description}</Typography>
              <Typography>${p.price}</Typography>
              <Typography>In Stock: {p.inStock}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => addToCart(p)}>Add To Cart</Button>
              <Button component={Link} to={`/product/${p.id}`}>View Details</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = state => ({
  products: state.products.productList,
  activeCategory: state.categories.activeCategory
});
export default connect(mapStateToProps, { getProducts, addToCart })(Products);
