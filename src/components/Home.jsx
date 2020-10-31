import React, { useState } from 'react'
import * as d3 from 'd3';
import PhaseDiagram from './PhaseDiagram';
import Map from './Map';
import MapQ from './MapQ';
import MapP from './MapP';
import { AppBar, Toolbar, Typography, makeStyles, TextField, Button, Grid, GridListTile, GridList } from '@material-ui/core';
const nerdamer = require('nerdamer/all');
const algebrite = require('algebrite');

window.d3 = d3;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: theme.spacing(2),
  },
}));

export const Home = () => {
  const classes = useStyles();
  const [func, setFunc] = useState(null);
  const [funcQvsK, setFuncQvsK] = useState(null);
  const [funcPvsK, setFuncPvsK] = useState(null);
  const [points, setPoints] = useState([]);
  const [qkValue, setqKValue] = useState(null);
  const [pkValue, setpKValue] = useState(null);
  const [pValue, setP] = useState(null);
  const [qValue, setQ] = useState(null);
  const [showMatriz, setShowMatriz] = useState(false);

  function calculateFunction() {
    //TRAZA DE LA MATRIZ
    const p = algebrite.simplify(values.inputA.toString() + '+' + values.inputD.toString()).toString();
    //DETERMINANTE DE LA MATRIZ
    let matriz = '[[' + values.inputA + ',' + values.inputB + '],[' + values.inputC + ',' + values.inputD + ']]';
    const q = algebrite.det(matriz).toString();

    const regExp = /[a-z|A-Z]/;
    setqKValue(null);
    setpKValue(null);
    setFuncQvsK(null);
    setFuncPvsK(null);
    if (regExp.test(q)) {
      let qk = q.replace('a', 'x');
      setqKValue(qk);
      setFuncQvsK(qk.toString());
    }
    if (regExp.test(p)) {
      let pk = p.replace('a', 'x');
      setpKValue(pk);
      setFuncPvsK(pk.toString());
    }
    setQ(q);
    setP(p);
    setFunc(nerdamer(`${q}-((${p})^2)/4`));
    //setInterval(setShowLoading(false),1000);
    return false;
  }


  const [values, setValues] = useState(
    {
      inputA: '1',
      inputB: 'a',
      inputC: '2',
      inputD: 'a',
    },
  );

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <React.Fragment>
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Sistemas 2D Lineales con escenarios
          </Typography>
          <GridList cellHeight={50} className={classes.gridList} cols={2} >
            <GridListTile>
              <Button onClick={() => setShowMatriz(!showMatriz)} variant="contained" color="secondary">Ingresar matriz</Button>
            </GridListTile>
            <GridListTile>
              <Button onClick={() => calculateFunction()} variant="contained" color="secondary">Calcular sistema</Button>
            </GridListTile>
          </GridList>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        {showMatriz && <Grid container item xs={4}>
          <Grid item xs={6}>
            <TextField
              name="inputA"
              label="Componente a"
              value={values.inputA}
              onChange={handleChange('inputA')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="inputB"
              label="Componente b"
              value={values.inputB}
              onChange={handleChange('inputB')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="inputC"
              label="Componente c"
              value={values.inputC}
              onChange={handleChange('inputC')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="inputD"
              label="Componente d"
              value={values.inputD}
              onChange={handleChange('inputD')}
              margin="normal"
            />
          </Grid>
          {func &&
            <>
              <Grid item xs={12}>
                <Typography variant="h5">{`q(Det(A)) = ${qValue}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">{`p(Traza(A)) = ${pValue}`}</Typography>
              </Grid>
            </>
          }
        </Grid>
        }
      </Grid>
      <Grid container justify="center">
        <Grid container item xs={12} style={{ backgroundColor: "grey" }}>
          <Grid item xs={6}>
            {func && <Map
              points={points}
              qValue={qValue}
              pValue={pValue}
            />}
          </Grid>
          <Grid item xs={6}>
            <PhaseDiagram
              handleSetPoints={setPoints}
              func={func}
              pValue={pValue}
              qValue={qValue}
            />
          </Grid>
          <Grid item xs={6}>
            {funcQvsK && <MapQ
              points={points}
              qValue={qkValue}
              pValue={pValue}
            />}
          </Grid>
          <Grid item xs={6}>
            {funcPvsK && <MapP
              points={points}
              qValue={qkValue}
              pValue={pkValue}
            />}
          </Grid>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
