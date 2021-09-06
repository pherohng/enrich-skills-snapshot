export const SIGN_UP_FORM_KEY = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword'
};

export const SIGN_UP_FORM_CONFIG = {
  [SIGN_UP_FORM_KEY.firstName]: {
    id: 'sign-up-form-first-name',
    type: 'text',
    label: 'FIRST NAME',
    containerClassName: 'col-12'
  },
  [SIGN_UP_FORM_KEY.lastName]: {
    id: 'sign-up-form-last-name',
    type: 'text',
    label: 'LAST NAME',
    containerClassName: 'col-12'
  },
  [SIGN_UP_FORM_KEY.email]: {
    id: 'sign-up-form-email',
    type: 'email',
    label: 'EMAIL',
    containerClassName: 'col-12'
  },
  [SIGN_UP_FORM_KEY.password]: {
    id: 'sign-up-form-password',
    type: 'password',
    label: 'PASSWORD',
    containerClassName: 'col-12'
  },
  [SIGN_UP_FORM_KEY.confirmPassword]: {
    id: 'sign-up-form-confirm-password',
    type: 'password',
    label: 'CONFIRM PASSWORD',
    containerClassName: 'col-12'
  }
};

export const SIGN_UP_FORM_CONSTRAINS = {
  [SIGN_UP_FORM_KEY.firstName]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    }
  },
  [SIGN_UP_FORM_KEY.lastName]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    }
  },
  [SIGN_UP_FORM_KEY.email]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    email: {
      message: '{label} is not valid'
    }
  },
  [SIGN_UP_FORM_KEY.password]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    length: {
      minimum: 6,
      tooShort: '{label} must be at least %{count} characters'
    }
  },
  [SIGN_UP_FORM_KEY.confirmPassword]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    equality: {
      attribute: SIGN_UP_FORM_KEY.password,
      message: '{label} does not match'
    }
  }
};

export const SIGN_IN_FORM_KEY = {
  email: 'email',
  password: 'password'
};

export const SIGN_IN_FORM_CONFIG = {
  [SIGN_UP_FORM_KEY.email]: {
    id: 'sign-in-form-email',
    type: 'email',
    label: 'EMAIL',
    containerClassName: 'col-12'
  },
  [SIGN_UP_FORM_KEY.password]: {
    id: 'sign-in-form-password',
    type: 'password',
    label: 'PASSWORD',
    containerClassName: 'col-12'
  },
};

export const SIGN_IN_FORM_CONSTRAINS = {
  [SIGN_UP_FORM_KEY.email]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    email: {
      message: '{label} is not valid'
    }
  },
  [SIGN_UP_FORM_KEY.password]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    }
  }
};

export const FORGOT_PASSWORD_FORM_KEY = {
  email: 'email'
};

export const FORGOT_PASSWORD_FORM_CONFIG = {
  [FORGOT_PASSWORD_FORM_KEY.email]: {
    id: 'forgot-password-form-email',
    type: 'email',
    label: 'EMAIL',
    containerClassName: 'col-12'
  }
};

export const FORGOT_PASSWORD_FORM_CONSTRAINS = {
  [FORGOT_PASSWORD_FORM_KEY.email]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    email: {
      message: '{label} is not valid'
    }
  }
};

export const PASSWORD_RESET_EMAIL_SENT_MESSAGE = 'A message has been sent to your email with instructions to reset your password. Please check your mailbox!';

export const RESET_PASSWORD_FORM_KEY = {
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword'
};

export const RESET_PASSWORD_FORM_CONFIG = {
  [RESET_PASSWORD_FORM_KEY.email]: {
    id: 'reset-password-form-email',
    type: 'email',
    label: 'EMAIL',
    containerClassName: 'col-12'
  },
  [RESET_PASSWORD_FORM_KEY.password]: {
    id: 'reset-password-form-password',
    type: 'password',
    label: 'PASSWORD',
    containerClassName: 'col-12'
  },
  [RESET_PASSWORD_FORM_KEY.confirmPassword]: {
    id: 'reset-password-form-confirm-password',
    type: 'password',
    label: 'CONFIRM PASSWORD',
    containerClassName: 'col-12'
  }
};

export const RESET_PASSWORD_FORM_CONSTRAINS = {
  [RESET_PASSWORD_FORM_KEY.password]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    length: {
      minimum: 6,
      tooShort: '{label} must be at least %{count} characters'
    }
  },
  [RESET_PASSWORD_FORM_KEY.confirmPassword]: {
    presence: {
      allowEmpty: false,
      message: '{label} is required'
    },
    equality: {
      attribute: RESET_PASSWORD_FORM_KEY.password,
      message: '{label} does not match'
    }
  }
};

export const PASSWORD_RESET_SUCCESSFULLY_MESSAGE = 'Your password has been successfully changed. Please sign in with your new password!';
