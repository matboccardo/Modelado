import React, { useState } from 'react'
import * as d3 from 'd3';
import PhaseDiagram from './PhaseDiagram';
import Map from './Map';
import MapQ from './MapQ';
import MapP from './MapP';
import { AppBar, Toolbar, Typography, makeStyles, TextField, Button, Grid } from '@material-ui/core';
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
    <div className={classes.root} id="app">
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Sistemas 2D Lineales con escenarios
          </Typography>
          <Button onClick={() => calculateFunction()} variant="contained">Calcular</Button>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        <Grid item xs={3}>
          <div style={{ display: 'inline-block', fontSize: '128px' }}>A=(</div>
        </Grid>
        <Grid container item xs={4}>
          <Grid item xs={6}>
            <TextField
              name="inputA"
              label="a"
              value={values.inputA}
              onChange={handleChange('inputA')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="inputB"
              label="b"
              value={values.inputB}
              onChange={handleChange('inputB')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="inputC"
              label="c"
              value={values.inputC}
              onChange={handleChange('inputC')}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="inputD"
              label="d"
              value={values.inputD}
              onChange={handleChange('inputD')}
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <div style={{ display: 'inline-block', fontSize: '128px' }}>)</div>
        </Grid>
        <Grid container item xs={4}>
          {func &&
            <>
              <Grid item xs={12}>
                <Typography variant="h5">{`q = ${qValue}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">{`p = ${pValue}`}</Typography>
              </Grid>
            </>
          }
        </Grid>
        <Grid container item xs={12}>
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
    </div>
  );
}
