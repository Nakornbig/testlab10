import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { PrenamesInterface } from "../models/IPrename";
import { GendersInterface } from "../models/IGender";
import { BloodtypesInterface } from "../models/IBloodType";
import { ProvincesInterface } from "../models/IProvince";
import { PersonnelsInterface } from "../models/IPersonnel";
import { PatientrecordInterface } from "../models/IPatientrecord";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function PatientrecordCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [prenames, setPrenames] = useState<PrenamesInterface[]>([]);
  const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [bloodtypes, setBloodTypes] = useState<BloodtypesInterface[]>([]);
  const [provinces, setProvinces] = useState<ProvincesInterface[]>([]);
  const [personnels, setPersonnels] = useState<PersonnelsInterface[]>([]);
  const [patientrecord, setPatientrecord] = useState<Partial<PatientrecordInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof patientrecord;
    setPatientrecord({
      ...patientrecord,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof PatientrecordCreate;
    const { value } = event.target;
    setPatientrecord({ ...patientrecord, [id]: value });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getPrenames = async () => {
    fetch(`${apiUrl}/prenames`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPrenames(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getGenders = async () => {
    fetch(`${apiUrl}/genders`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setGenders(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getBloodTypes = async () => {
    fetch(`${apiUrl}/bloodtypes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setBloodTypes(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getProvinces = async () => {
    fetch(`${apiUrl}/provinces`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setProvinces(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPersonnels = async () => {
    fetch(`${apiUrl}/personnels`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPersonnels(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getPrenames();
    getGenders();
    getBloodTypes();
    getProvinces();
    getPersonnels();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      PrenameID: convertType(patientrecord.PrenameID),
      Firstname: patientrecord.Firstname ?? "",
      Lastname: patientrecord.Lastname ?? "",
      Idcardnumber: patientrecord.Idcardnumber ?? "",
      Age: patientrecord.Age ?? "",
      Birthday: selectedDate,
      BloodType: convertType(patientrecord.BloodTypeID),
      Phonenumber: patientrecord.Phonenumber ?? "",
      Email: patientrecord.Email ?? "",
      Home: patientrecord.Home ?? "",
      ProvinceID: convertType(patientrecord.ProvinceID),
      Emergencyname: patientrecord.Emergencyname ?? "",
      Emergencyphone: patientrecord.Emergencyphone ?? "",
      ReturnTime: selectedDate,
      PersonnelID: convertType(patientrecord.PersonnelID),
    };

    const requestOptionsPost = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/patientrecords`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการลงทะเบียนคนไข้
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={2}>
            <FormControl fullWidth variant="outlined">
              <p>คำนำหน้า</p>
              <Select
                native
                value={patientrecord.PrenameID}
                onChange={handleChange}
                inputProps={{
                  name: "PrenameID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกคำนำหน้า
                </option>
                {prenames.map((item: PrenamesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Prename}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <p>First Name</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Firstname"
                variant="outlined"
                type="string"
                size="medium"
                value={patientrecord.Firstname || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <p>Last Name</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Lastname"
                variant="outlined"
                type="string"
                size="medium"
                value={patientrecord.Lastname || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={patientrecord.GenderID}
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพศ
                </option>
                {genders.map((item: GendersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Gender}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <p>Idcardnumber</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Idcardnumber"
                variant="outlined"
                type="string"
                size="medium"
                value={patientrecord.Idcardnumber || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <p>Age</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Age"
                variant="outlined"
                type="number"
                size="medium"
                value={patientrecord.Age || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>BirthDay</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="Birthday"
                  format="yyyy-MM-dd"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>กรุ๊ปเลือด</p>
              <Select
                native
                value={patientrecord.BloodTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "BloodTypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกกรุ๊ปเลือด
                </option>
                {bloodtypes.map((item: BloodtypesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Bloodtype}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>Phonenumber</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Phonenumber"
                variant="outlined"
                type="string"
                size="medium"
                value={patientrecord.Phonenumber || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>Email</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                value={patientrecord.Email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>Home</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Home"
                variant="outlined"
                type="string"
                size="medium"
                value={patientrecord.Home || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จังหวัด</p>
              <Select
                native
                value={patientrecord.ProvinceID}
                onChange={handleChange}
                inputProps={{
                  name: "ProvinceID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกจังหวัด
                </option>
                {provinces.map((item: ProvincesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Province}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>Emergencyname</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Emergencyname"
                variant="outlined"
                type="string"
                size="medium"
                value={patientrecord.Emergencyname || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>Emergencyphone</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Emergencyphone"
                variant="outlined"
                type="string"
                size="medium"
                value={patientrecord.Emergencyphone || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="Timestamp"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="กรุณาเลือกวันที่และเวลา"
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อพนักงานเวชระเบียน</p>
              <Select
                native
                value={patientrecord.PersonnelID}
                onChange={handleChange}
                inputProps={{
                  name: "PersonnelID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อพนักงานเวชระเบียน
                </option>
                {personnels.map((item: PersonnelsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Personnel}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึกการลงทะเบียนคนไข้
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PatientrecordCreate;
