import * as yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export const formValidationSchema = yup.object({
  password: yup
    .string()
    .min(8, "password is too short")
    .required("password can't be blank"),
});

export function Reset() {
  const history = useHistory();
  const { id } = useParams();
  const { token } = useParams();

  localStorage.setItem("id", id);
  localStorage.setItem("token", token);

  if (!id) {
    history.push("/login");
  }

  const theme = createTheme();

  const { handleSubmit, handleChange, values, handleBlur, errors, touched } =
    useFormik({
      initialValues: { password: "" },
      validationSchema: formValidationSchema,

      onSubmit: (values) => {
        checkCredentials(values);
      },
    });

  const checkCredentials = async (values) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const response = await fetch(
      `https://forgot-password-by-vrushabh.herokuapp.com/forgotPassword/resetpassword/${id}/${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.success) {
      alert("Password Changed Successfully");
      history.push("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    name="password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Password"
                    type="password"
                    error={errors.password && touched.password}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
