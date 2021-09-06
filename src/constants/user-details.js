export const USER_DETAILS_FORM_KEY = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email'
};

export const USER_DETAILS_FORM_CONFIG = {
  [USER_DETAILS_FORM_KEY.firstName]: {
    id: 'user-details-form-first-name',
    type: 'text',
    label: 'FIRST NAME',
    containerClassName: 'col-12'
  },
  [USER_DETAILS_FORM_KEY.lastName]: {
    id: 'user-details-form-last-name',
    type: 'text',
    label: 'LAST NAME',
    containerClassName: 'col-12'
  },
  [USER_DETAILS_FORM_KEY.email]: {
    id: 'user-details-form-email',
    type: 'email',
    label: 'EMAIL',
    containerClassName: 'col-12'
  }
};

export const USER_DETAILS_FORM_CONSTRAINS = {
  [USER_DETAILS_FORM_KEY.firstName]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    }
  },
  [USER_DETAILS_FORM_KEY.lastName]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    }
  }
};

export const CHANGE_PASSWORD_FORM_KEY = {
  currentPassword: 'currentPassword',
  password: 'password',
  confirmPassword: 'confirmPassword'
};

export const CHANGE_PASSWORD_FORM_CONFIG = {
  [CHANGE_PASSWORD_FORM_KEY.currentPassword]: {
    id: 'change-password-form-current-password',
    type: 'password',
    label: 'CURRENT PASSWORD',
    containerClassName: 'col-12'
  },
  [CHANGE_PASSWORD_FORM_KEY.password]: {
    id: 'change-password-form-password',
    type: 'password',
    label: 'NEW PASSWORD',
    containerClassName: 'col-12'
  },
  [CHANGE_PASSWORD_FORM_KEY.confirmPassword]: {
    id: 'change-password-form-confirm-password',
    type: 'password',
    label: 'CONFIRM PASSWORD',
    containerClassName: 'col-12'
  }
};

export const CHANGE_PASSWORD_FORM_CONSTRAINS = {
  [CHANGE_PASSWORD_FORM_KEY.currentPassword]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    }
  },
  [CHANGE_PASSWORD_FORM_KEY.password]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    length: {
      minimum: 6,
      tooShort: '{label} must be at least %{count} characters'
    }
  },
  [CHANGE_PASSWORD_FORM_KEY.confirmPassword]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    equality: {
      attribute: CHANGE_PASSWORD_FORM_KEY.password,
      message: '{label} does not match'
    }
  }
};
