import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { When } from 'react-if';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { removeFromCart } from '../../store/cart';

const useStyles = makeStyles(theme => ({
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(1), padding: theme.spacing(1), borderBottom: '1px solid #eee' },  remove: { cursor: "pointer", color: "#fff", background: "#800", borderRadius: "50%", padding: "0 6px" },
  footer: { marginTop: theme.spacing(2), textAlign: 'center' },
  header: { marginBottom: theme.spacing(1), fontWeight: 300 }
}));

const SimpleCart = ({ cart, removeFromCart }) => {
  const classes = useStyles();
  const items = Array.isArray(cart?.items) ? cart.items : [];
  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  return (
    <When condition={items.length > 0}>
      <div className="simple-cart">
        <ul></ul>
        <Typography variant="h6" className={classes.header}>Your Boutique Basket</Typography>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item.id || item._id} className={classes.item}>
              <RouterLink to={`/product/${item.id || item._id}`}>{item.name}</RouterLink>
              <span className={classes.remove} onClick={() => removeFromCart(item)}>×</span>
            </li>
          ))}
        </ul>
        <div className={classes.footer}>
          <Typography variant="subtitle1">Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/cart" style={{ marginTop: '10px' }}>
            Checkout
          </Button>
        </div>
      </div>
    </When>
  );
};

const mapStateToProps = state => ({ cart: state.cart });
export default connect(mapStateToProps, { removeFromCart })(SimpleCart);
