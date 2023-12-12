import { memo, useCallback, useState } from 'react';

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Button
  // Typography
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project imports
import { useAuthenticationStore } from '~/hooks/authentication';
import AnimateButton from '~/ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const { dispatchLogin, authenticationState, dispatchChangeRememberMe } = useAuthenticationStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((value) => !value);
  }, []);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          email: 'admin1@gmail.com',
          password: 'admin@123',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().matches(/\S/, 'Tên người dùng không hợp lệ').max(255).required('Vui lòng nhập tên người dùng'),
          password: Yup.string().max(255).required('Vui lòng nhập mật khẩu')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const result = dispatchLogin({
              email: values.email,
              password: values.password
            });
            if (result) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-username-login"
                type="text"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
                inputProps={{}}
              />
              <FormHelperText
                error
                id="standard-weight-helper-text-username-login"
                style={{ visibility: touched.email && errors.email ? 'visible' : 'hidden', display: 'block' }}
              >
                {errors.email}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
                style={{ visibility: touched.password && errors.password ? 'visible' : 'hidden', display: 'block' }}
              >
                {errors.password}
              </FormHelperText>
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={authenticationState.rememberMe}
                    onChange={(event) => dispatchChangeRememberMe(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Ghi nhớ mật khẩu"
              />
            </Stack>
            <Box sx={{ mt: 3, visibility: errors.submit ? 'visible' : 'hidden' }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{ color: 'white' }}
                >
                  Đăng nhập
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default memo(FirebaseLogin);
