import React from 'react';
import { connect } from 'react-redux';
import { When } from 'react-if';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  categoryName: {
    textTransform: 'uppercase',
  },
}));

const CurrentCategory = ({ activeCategory, categories = [] }) => {
  const classes = useStyles();

  const currentCat = categories.find((cat) => cat.name === activeCategory);

  return (
    <When condition={!!activeCategory}>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            className={classes.categoryName}
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {activeCategory}
          </Typography>

          <Typography variant="subtitle1" align="center" color="textSecondary">
            {currentCat ? currentCat.description : " Gem Boutique - HandCrafted Jewlery"}
          </Typography>
        </Container>
      </div>
    </When>
  );
};

const mapStateToProps = (state) => ({
  activeCategory: state.categories.activeCategory,
  categories: state.categories?.categories || [], 
});

export default connect(mapStateToProps)(CurrentCategory);
