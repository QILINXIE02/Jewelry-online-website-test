import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { When } from 'react-if';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { removeFromCart } from '../../store/cart';

const useStyles = makeStyles(theme => ({
  drawer: { width: 320, top: '5em', flexShrink: 0 },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(1), padding: theme.spacing(1), borderBottom: '1px solid #eee' },
  remove: { cursor: 'pointer', fontWeight: 700 },
  footer: { marginTop: theme.spacing(2), textAlign: 'center' },
  header: { marginBottom: theme.spacing(1), fontWeight: 600 }
}));

const SimpleCart = ({ removeFromCart, cart }) => {
  const classes = useStyles();

  // safely handle cart items
  const items = Array.isArray(cart?.items) ? cart.items : [];
  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  const handleRemove = (item) => {
    if (typeof removeFromCart === 'function') removeFromCart(item);
  };

  return (
    <When condition={items.length > 0}>
      <div className="simple-cart">
        <Typography variant="h6" className={classes.header}>Your Boutique Basket</Typography>
        <ul style={{listStyle: 'none', padding: 0}}>
          {items.map(item => (
            <li key={item._id || item.name} className={classes.item}>
              <Link component={RouterLink} to={`/product/${item._id}`} underline="hover">
                {item.name}
              </Link>
              <span className={classes.remove} onClick={() => handleRemove(item)}>×</span>
            </li>
          ))}
        </ul>
        <div className={classes.footer}>
          <Typography variant="subtitle1">Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/cart" style={{marginTop: '10px'}}>
            Checkout
          </Button>
        </div>
      </div>
    </When>
  );
};

const mapStateToProps = state => ({ cart: state.cart || { items: [] } });
const mapDispatchToProps = { removeFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCart);
