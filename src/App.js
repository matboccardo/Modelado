import React, { useState } from 'react'
import './App.css';
import * as d3 from 'd3';
import PhaseDiagram from './components/PhaseDiagram';
import Map from './components/Map';
import MapQ from './components/MapQ';
import MapP from './components/MapP';
import { AppBar, Toolbar, Typography, makeStyles, TextField, Button, Grid } from '@material-ui/core';
const nerdamer = require('nerdamer/all');
var algebrite = require('algebrite');

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

function App() {
  const classes = useStyles();
  const [func, setFunc] = useState(null);
  const [funcQvsK, setFuncQvsK] = useState(null);
  const [funcPvsK, setFuncPvsK] = useState(null);
  const [points, setPoints] = useState([]);
  const [qkValue, setqKValue] = useState(null);
  const [pkValue, setpKValue] = useState(null);
  const [pValue, setP] = useState(null);
  const [qValue, setQ] = useState(null);
  const calculateFunction = () => {
    //TRAZA DE LA MATRIZ
    const p = algebrite.simplify(values.inputA.toString() + '+' + values.inputD.toString()).toString();
    //DETERMINANTE DE LA MATRIZ
    let matriz = '[[' + values.inputA + ',' + values.inputB + '],[' + values.inputC + ',' + values.inputD + ']]';
    const q = algebrite.det(matriz).toString();

    const regExp = /[a-z|A-Z]/;
    
    if(regExp.test(q)){
      let qk = q.replace('a', 'x');
      setqKValue(qk);
      setFuncQvsK(qk.toString());
    }
    if(regExp.test(p)){
      let pk = p.replace('a', 'x');
      setpKValue(pk);
      setFuncPvsK(pk.toString());
    }
    setQ(q);
    setP(p);
    //setFunc(nerdamer(`${q}-((${p})^2)/4`));
    setFunc(nerdamer(q));
    
    
  }

  const [values, setValues] = useState(
    {
      inputA: '2',
      inputB: 'a',
      inputC: 'a',
      inputD: '2',
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
            Sistema lineales 2D con escenarios(Acoplados)
          </Typography>
          <Button onClick={calculateFunction} variant="contained">Calcular</Button>
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
        <Grid container>
          <Grid item xs={6}>
            {func && <Map
              points={points}
              qValue={qValue}
              pValue={pValue}
            />}
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
              qValue={qValue}
              pValue={pkValue}
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
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
