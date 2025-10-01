import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../store/products';
import { addToCart } from '../../store/cart';
import SimpleCart from '../cart/simple-cart';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  heroContent: { padding: theme.spacing(8,0,6) },
  productName: { textTransform: 'uppercase' },
  layout: { margin: 'auto', width: '90%', maxWidth: 600 },
  paper: { padding: theme.spacing(2), marginBottom: theme.spacing(3) },
  image: { maxWidth: '100%', borderRadius: '8px', marginBottom: theme.spacing(2) },
  buyButton: { marginTop: theme.spacing(2), width: '100%' },
  relatedItem: { padding: theme.spacing(2), textAlign: 'center', background: '#fff0f5', borderRadius: '6px' }
}));

const Product = ({ id, getProduct, addToCart, activeProduct }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (e, isExpanded) => setExpanded(isExpanded ? panel : false);

  const loadProduct = useCallback(() => getProduct(id), [getProduct, id]);
  useEffect(() => { loadProduct() }, [loadProduct]);

  return (
    <div className={classes.heroContent}>
      <SimpleCart />
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" className={classes.productName} align="center">{activeProduct.name}</Typography>
        <Typography variant="h5" align="center" color="textSecondary">{activeProduct.description}</Typography>
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <img src={activeProduct.image} alt={activeProduct.name} className={classes.image} />
            <Grid container>
              <Grid item xs={6}><Typography variant="h5">In Stock: <strong>{activeProduct.inStock}</strong></Typography></Grid>
              <Grid item xs={6}><Typography variant="h5" align="right">${activeProduct.price}</Typography></Grid>
            </Grid>
          </Paper>
          {activeProduct.inStock > 0 && <Button variant="contained" color="primary" className={classes.buyButton} onClick={() => addToCart(activeProduct)}>Add to Cart</Button>}

          <Typography variant="h4" gutterBottom>Related Items</Typography>
          <Grid container spacing={2}>
            {["Suggestion 1","Suggestion 2","Suggestion 3"].map(s => (
              <Grid item xs={4} key={s}><Paper className={classes.relatedItem}>{s}</Paper></Grid>
            ))}
          </Grid>

          <ExpansionPanel expanded={expanded==='panel1'} onChange={handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Product Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails><Typography>Specifications, care instructions, and crystal origin.</Typography></ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel expanded={expanded==='panel2'} onChange={handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>User Reviews</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails><Typography>A list of reviews ...</Typography></ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  activeProduct: state.products.activeProduct,
  id: props.match.params.id
});

export default connect(mapStateToProps, { getProduct, addToCart })(Product);
