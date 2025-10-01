import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { When } from 'react-if';
import { removeFromCart } from '../../store/cart';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  simpleCart: {
    background: '#fff8f0',
    border: '1px solid #f0e6e0',
    padding: theme.spacing(2),
    borderRadius: '8px',
    margin: theme.spacing(2,0)
  },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(1) },
  remove: { cursor: "pointer", color: "#fff", background: "#d9534f", borderRadius: "50%", padding: "0 6px" },
  footer: { marginTop: theme.spacing(2), textAlign: 'center' }
}));

const SimpleCart = ({ cart, removeFromCart }) => {
  const classes = useStyles();
  const total = cart.items.reduce((sum, i) => sum + (i.price || 0), 0);

  return (
    <When condition={cart.items.length > 0}>
      <div className={classes.simpleCart}>
        <Typography variant="h6">Your Cart</Typography>
        <ul>
          {cart.items.map(item => (
            <li key={item.id} className={classes.item}>
              <Link component={RouterLink} to={`/product/${item.id}`}>{item.name}</Link>
              <span>${item.price}</span>
              <span className={classes.remove} onClick={() => removeFromCart(item)}>×</span>
            </li>
          ))}
        </ul>
        <div className={classes.footer}>
          <Typography variant="subtitle1">Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/cart">Checkout</Button>
        </div>
      </div>
    </When>
  );
};

export default connect(state => ({ cart: state.cart }), { removeFromCart })(SimpleCart);
