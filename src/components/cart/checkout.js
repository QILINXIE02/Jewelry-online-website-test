// src/components/cart/Checkout.js
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  TextField,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  layout: { width: 'auto', margin: theme.spacing(3) },
  paper: { padding: theme.spacing(3) },
  total: { fontWeight: 700 },
  listItem: { paddingTop: theme.spacing(1), paddingBottom: theme.spacing(1) },
}));

function Checkout({ cart }) {
  const classes = useStyles();

  // Safely compute total price
  const total = cart.items.reduce((sum, p) => sum + (Number(p?.price) || 0), 0);

  return (
    <Box className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <List disablePadding>
          {cart.items.map((product) => (
            <ListItem key={product._id || product.id} className={classes.listItem}>
              <ListItemText
                primary={product.name || 'Unnamed product'}
                secondary={product.description || 'No description'}
              />
              <Typography variant="body2">
                ${Number(product.price || 0).toFixed(2)}
              </Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              ${total.toFixed(2)}
            </Typography>
          </ListItem>
        </List>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Billing Address
            </Typography>
            {['Full Name', 'Address', 'City', 'State', 'Zip'].map((label) => (
              <TextField key={label} fullWidth label={label} margin="dense" />
            ))}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <TextField fullWidth label="Credit Card #" margin="dense" />
            <TextField
              fullWidth
              label="Expiration"
              type="date"
              InputLabelProps={{ shrink: true }}
              margin="dense"
            />
            <TextField fullWidth label="CVV" margin="dense" />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            disabled={cart.items.length === 0} // disable if cart is empty
          >
            Place Your Order
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart || { items: [] },
});

export default connect(mapStateToProps)(Checkout);
