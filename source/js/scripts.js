"use strict";

const MENU = `.js-menu`;
const MENU_BUTTON = `.js-menu-button`;
const MENU_CLOSE = `.js-menu-close`;
const MENU_ACTIVE_CLASS = `main-menu--active`;
const MENU_CLOSED_CLASS = `main-menu--closed`;
const CLASS_REMOVING_TIME = 700;

const SLIDER_CLASSES = [`peppermint`, `peppermint-inactive`];
const SLIDER = `.js-slider`;
const SLIDER_NAV = `.js-slider-navigation`;
const SLIDER_PREV = `.js-slider-prev`;
const SLIDER_NEXT = `.js-slider-next`;
const SLIDER_DOTS = `.js-slider-dots`;

const MODAL = `.js-modal`;
const MODAL_CLOSE = `.js-modal-close`;
const MODAL_BUTTON = `.js-modal-button`;
const MODAL_ACTIVE_CLASS = `modal--active`;
const MODAL_CLOSED_CLASS = `modal--closed`;

const SELECT = `.js-select`;
const SELECT_BUTTON = `.js-select-button`;
const SELECT_LIST = `.js-select-list`;
const SELECT_INPUT = `js-select-input`;
const SELECT_ACTIVE_CLASS = `like-select__list--active`;
const SELECT_CURRENT_OPTION_CLASS = `like-select__current`;

const SCROLL_BUTTON_CLASS = `.js-scroll`;

const HEADER = `.header`;
const HEADER_INVERSE_CLASS = `header--gold`;
const INVERSE_CLASS = `.js-inverse`;

const LOADING = `.js-loading`;
const LOADING_HIDDEN_CLASS = `loading--hidden`;

const SCROLL_OFFSET = -50;

const FORM = `.form`;
const FORM_VALIDATION = `.js-form`;
const FORM_RESULT = `.js-result`;
const FORM_INPUT = `.form__input`;
const FORM_RESULT_ACTIVE_CLASS = `notification--active`;
const FORM_RESULT_SUCCESS_CLASS = `notification--green`;
const FORM_RESULT_ERROR_CLASS = `notification--red`;
const FORM_ALERT_ERROR = `Ошибка отправки!`;
const FORM_ALERT_SUCCESS = `Отправлено!`;
const FORM_METHOD = `POST`;
const FORM_SERVER_URL = ``;
const FORM_FIELD_DEFAULT_VALUE = ``;
const FORM_SUBMIT = `.js-submit`;
const FORM_AGREE = `.js-agree`;
const FORM_DATE = '.js-date-picker';
const FORM_DATE_FORMAT = `F j, Y`;
const FORM_MASK = `.js-masked-input`;

const ADD_DOC = `.js-add-doc`;
const ADD_DOC_BUTTON = `.js-add-doc-open`;
const ADD_DOC_CLOSE_BUTTON = `.js-add-doc-close`;
const ADD_DOC_ACTIVE = `add-doc--active`;
const ADD_DOC_VISIBLE = `add-doc--visible`;

const FILE = `.js-file`;
const FILE_FIELD = `.js-file-field`;
const FILE_MARK = `.js-file-mark`;
const FILE_INPUT = `js-file-input`;

const VALIDATE_FIELD = `[data-validate='true']`;
const VALIDATE_TRUE_CLASS = `form__input--success`;
const VALIDATE_FALSE_CLASS = `form__input--error`;

const SLIDER_SLIDE_CLASS = `latest-slider__slide`;

const TAG_SEPARATOR = `,`;

const Test = {
  REQUIRED: `required`,
  PHONE: `phone`,
  EMAIL: `email`,
  TAGS: `tags`,
};

const MaskTemplates = {
  phone: new Inputmask(`+7 (999) 999-99-99`),
  email: new Inputmask({regex: '[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]+'}),
};

const SlidersSettings = {
  speed: 250,
  touchSpeed: 250,
  stopSlideshowAfterInteraction: true,
  dots: true,
  isResponsive: false,
};

const Resolution = {
  PC: 1200,
  TABLET: 560,
  MOBILE: 0,
};

const SliderItem = {
  PC: 4,
  TABLET: 2,
  MOBILE: 1,
};

const switchModalClasses = (element, classes) => {
  const {active, closed} = classes;
  element = element.classList;

  element.remove(active);
  element.add(closed);

  setTimeout(() => {
    element.remove(closed);
  }, CLASS_REMOVING_TIME);
};

document.addEventListener(`DOMContentLoaded`, function() {

  setTimeout(() => {
    document.querySelector(LOADING).classList.add(LOADING_HIDDEN_CLASS);
  }, 300);

  /* menu */

  const menuWrapper = document.querySelector(MENU);
  const menuButton = document.querySelector(MENU_BUTTON);
  const menuButtonClose = menuWrapper.querySelector(MENU_CLOSE);

  const openMenu = () => {
    menuWrapper.classList.add(MENU_ACTIVE_CLASS);

    menuButtonClose.addEventListener('click', closeMenu);
  };

  const closeMenu = () => {
    switchModalClasses(menuWrapper, {active: MENU_ACTIVE_CLASS, closed: MENU_CLOSED_CLASS,});

    menuButtonClose.removeEventListener(`click`, closeMenu);
  };

  const isMenuOpen = (menu) => menu.classList.contains(MENU_ACTIVE_CLASS);

  menuButton.addEventListener(`click`, () => {
    (!isMenuOpen(menuWrapper)) ? openMenu() : closeMenu();
  });

  /* menu */

  /* modal */

  const closeModal = (modal, button) => {
    switchModalClasses(modal, {active: MODAL_ACTIVE_CLASS, closed: MODAL_CLOSED_CLASS,});

    button.removeEventListener(`click`, onModalCloseClick);
  }

  const openModal = (button) => {
    const target = document.querySelector(button.dataset.target);
    const modalClose = target.querySelector(MODAL_CLOSE);

    if (target) {
      target.classList.add(MODAL_ACTIVE_CLASS);

      modalClose.addEventListener(`click`, onModalCloseClick);
    }
  };

  const onModalCloseClick = (evt) => {
    evt.preventDefault();

    const modal = evt.target.closest(MODAL);

    closeModal(modal, evt.target);
  }

  const onModalButtonClick = (evt) => {
    evt.preventDefault();

    openModal(evt.target);
  };

  const modalButtons = Array.from(document.querySelectorAll(MODAL_BUTTON));

  if (modalButtons.length) {
    modalButtons.map((modalButton) => {
      modalButton.addEventListener(`click`, onModalButtonClick);
    });
  }

  /* modal */

  /* scroll */

  const scrollButtons = Array.from(document.querySelectorAll(SCROLL_BUTTON_CLASS));

  if (scrollButtons.length) {
    scrollButtons.map((scrollButton) => {
      scrollButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const target = document.querySelector(evt.target.dataset.target);
        const position = target.getBoundingClientRect().top;

        if (isMenuOpen(menuWrapper)) {
          closeMenu();
        }

        window.scrollBy({
          top: position,
          behavior: `smooth`,
        });

      });
    });
  }

  /* scroll */

  /* sliders */

  const createContainers = (slides, parentElement) => {
    parentElement.innerHTML = ``;

    const currentWindowWidth = document.documentElement.clientWidth;
    let itemsNumb = SliderItem.PC;

    if (currentWindowWidth >= Resolution.PC) {
      itemsNumb = SliderItem.PC;
    } else if (currentWindowWidth >= Resolution.TABLET && currentWindowWidth < Resolution.PC) {
      itemsNumb = SliderItem.TABLET;
    } else {
      itemsNumb = SliderItem.MOBILE;
    }

    const containersNumb = Math.ceil(slides.length / itemsNumb);
    let slidesIndex = 0;

    for (let i = 0; i < containersNumb; i++) {
      let slideElement = document.createElement(`div`);
      slideElement.classList.add(SLIDER_SLIDE_CLASS);

      for (let j = slidesIndex, k = 0; k < itemsNumb; j++, k++) {
        let clone = slides[j].cloneNode(true);

        slideElement.insertAdjacentElement(`beforeend`, clone);

        if (j === slides.length - 1) {
          break;
        }
      }

      slidesIndex += itemsNumb;

      parentElement.appendChild(slideElement);
    }
  };

  const handleWindowResize = (slides, sliderContainer, dotsContainer, sliderSettings) => {
    const sliderWrapper = sliderContainer.querySelector(SLIDER);
    const sliderNavigation = sliderContainer.querySelector(SLIDER_NAV);

    createContainers(slides, sliderWrapper);

    dotsContainer.innerHTML = ``;

    const slider = Peppermint(
      sliderWrapper, {
        ...sliderSettings,
        dotsContainer: dotsContainer,
    });

    if (sliderNavigation) {
      sliderNavigation.addEventListener(`click`, handleSliderControlClick.bind(null, slider, sliderContainer));
    }
  };

  const handleSliderControlClick = (slider, sliderContainer, evt) => {
    const sliderPrev = sliderContainer.querySelector(SLIDER_PREV);
    const sliderNext = sliderContainer.querySelector(SLIDER_NEXT);

    if (evt.target === sliderPrev ) {
      slider.prev();
    }

    if (evt.target === sliderNext ) {
      slider.next();
    }
  };

  const initSlider = (sliderContainer, sliderSettings = SlidersSettings) => {
    if (sliderContainer) {
      const sliderWrapper = sliderContainer.querySelector(SLIDER);
      const sliderNavigation = sliderContainer.querySelector(SLIDER_NAV);
      const sliderDots = sliderContainer.querySelector(SLIDER_DOTS);
      let sourceSlides = null;

      sliderWrapper.classList.add(...SLIDER_CLASSES);

      if (sliderSettings.isResponsive) {
        sourceSlides = sliderContainer.querySelectorAll(`.latest__source .latest-slider__item`);

        createContainers(sourceSlides, sliderWrapper);
      }

      const slider = Peppermint(
        sliderWrapper, {
          ...sliderSettings,
          dotsContainer: sliderDots,
      });

      if (sliderNavigation) {
        sliderNavigation.addEventListener(`click`, handleSliderControlClick.bind(null, slider, sliderContainer));
      }

      if (sliderSettings.isResponsive) {
        window.addEventListener(`resize`, handleWindowResize.bind(null, sourceSlides, sliderContainer, sliderDots, sliderSettings));
      }
    }
  };

  initSlider(document.querySelector(`.js-shortnews-slider`), {
    ...SlidersSettings,
    slideshow: true,
    slideshowInterval: 5000,
  });

  /* sliders */

  /* __ form sending */

  const clearForm = (form) => {
    const fields = Array.from(form.querySelectorAll(FORM_INPUT));
    const resultField = form.querySelector(FORM_RESULT);
    const agreeField = form.querySelector(FORM_AGREE);
    const submitButton = form.querySelector(FORM_SUBMIT);
    let fieldResetValue = FORM_FIELD_DEFAULT_VALUE;

    fields.map((field) => {
      console.log(field);
      if (field.classList.contains(SELECT_INPUT)) {
        const selectButton = field.parentNode.querySelector(SELECT_BUTTON);
        const selectList = field.parentNode.querySelector(`.${SELECT_CURRENT_OPTION_CLASS}`);
        const selectDefaultValue = selectButton.dataset.default;

        selectButton.querySelector(`span`).textContent = selectDefaultValue;
        selectList.classList.remove(SELECT_CURRENT_OPTION_CLASS);

        fieldResetValue = selectDefaultValue;
      }

      if (field.classList.contains(FILE_INPUT)) {
        field.files = null;

        const fileUpload = field.parentNode.querySelector(FILE_MARK);
        fileUpload.textContent = fileUpload.dataset.default;
      }

      field.value = fieldResetValue;
    });

    agreeField.checked = false;
    submitButton.disabled = true;

    resultField.classList.remove(FORM_RESULT_ACTIVE_CLASS, FORM_RESULT_SUCCESS_CLASS, FORM_RESULT_ERROR_CLASS);
  };

  const handleDataLoaded = (form) => {
    const resultField = form.querySelector(FORM_RESULT);

    resultField.textContent = FORM_ALERT_SUCCESS;
    resultField.classList.add(FORM_RESULT_ACTIVE_CLASS, FORM_RESULT_SUCCESS_CLASS);

    setTimeout(clearForm.bind(null, form), 2000);
  };

  const handleDataFailed = (form) => {
    const resultField = form.querySelector(FORM_RESULT);

    resultField.textContent = FORM_ALERT_ERROR;
    resultField.classList.add(FORM_RESULT_ACTIVE_CLASS, FORM_RESULT_ERROR_CLASS);
  };

  const sendFormData = (form) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);

    xhr.addEventListener(`load`, handleDataLoaded.bind(null, form));
    xhr.addEventListener(`error`, handleDataFailed.bind(null, form));

    xhr.open(FORM_METHOD, FORM_SERVER_URL);
    xhr.send(formData);
  };

  /* __ form sending */

  /* __ form check */

  const testRequired = (valueToTest) => {
    return valueToTest !== ``;
  };

  const testPhone = (valueToTest) => {
    const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    return phoneRegExp.test(valueToTest);
  };

  const testEmail = (valueToTest) => {
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegExp.test(valueToTest);
  };

  const testTags = (valueToTest) => {
    const tags = valueToTest.replace(/\s+/, ``).split(TAG_SEPARATOR);

    return tags.length <= 3;
  };

  const checkField = (field) => {
    const tests = Object.keys(field.dataset);
    const fieldValue = field.value;

    const testingResult = tests.every((test) => {
      let singleTestResult = true;

      switch (test) {
        case Test.REQUIRED:
          singleTestResult = testRequired(fieldValue);
          break;

        case Test.PHONE:
          singleTestResult = testPhone(fieldValue);
          break;

        case Test.EMAIL:
          singleTestResult = testEmail(fieldValue);
          break;

        case Test.TAGS:
          singleTestResult = testTags(fieldValue);
      }

      return singleTestResult;
    });

    field.classList.remove(VALIDATE_TRUE_CLASS, VALIDATE_FALSE_CLASS);
    testingResult ? field.classList.add(VALIDATE_TRUE_CLASS) : field.classList.add(VALIDATE_FALSE_CLASS);

    return testingResult;
  };

  const checkForm = (formToCheck) => {
    const fieldsToCheck = Array.from(formToCheck.querySelectorAll(VALIDATE_FIELD));

    const checkPromise = new Promise((resolve, reject) => {
      const validationResult = fieldsToCheck.every((field) => {
        return checkField(field);
      });

      validationResult ? resolve(validationResult) : reject(validationResult);
    });

    checkPromise.then(
      result => result
    ).then(
      result => sendFormData(formToCheck),
      error => console.log(`no`)
    );
  };

  const handleFormSubmit = (form, evt) => {
    evt.preventDefault();

    checkForm(form);
  };

  const form = document.querySelector(FORM_VALIDATION);

  if (form) {
    form.addEventListener(`submit`, handleFormSubmit.bind(null, form));
  }

  /* __ form check */

  /* form agree */

  const changeSubmitAvailability = (checkbox) => {
    const formSubmit = document.querySelector(FORM_SUBMIT);

    formSubmit.disabled = !checkbox.checked;
  };

  const handleFormAgreeClick = (evt) => {
    changeSubmitAvailability(evt.target);
  };

  if (form) {
    const formAgreeField = form.querySelector(FORM_AGREE);

    if (formAgreeField) {
      formAgreeField.addEventListener(`click`, handleFormAgreeClick);
    } else {
      const formSubmit = document.querySelector(FORM_SUBMIT);

      formSubmit.disabled = false;
    }
  }

  /* form agree */

  /* scrollspy */

  const changeHeaderClass = (offsets) => {
    const header = document.querySelector(HEADER);
    const windowScroll = window.pageYOffset - SCROLL_OFFSET;
    let isInverse = false;

    for (let i = 0; i < offsets.length; i++) {
      isInverse = offsets[i][0] <= windowScroll && windowScroll <= offsets[i][1];

      if (isInverse) {
        break;
      }
    }

    if (isInverse) {
      header.classList.add(HEADER_INVERSE_CLASS);
    } else {
      header.classList.remove(HEADER_INVERSE_CLASS);
    }
  };

  const onWindowScroll = (offsets) => {
    changeHeaderClass(offsets);
  };

  const sectionsForInverse = Array.from(document.querySelectorAll(INVERSE_CLASS));

  const addMultipleEventListeners = (element, events, handler) => {
    events.forEach((action) => {
      element.addEventListener(action, handler);
    });
  };

  if (sectionsForInverse) {
    const sectionsOffsets = sectionsForInverse.map((section) => ([section.offsetTop, section.offsetTop + section.offsetHeight]));

    addMultipleEventListeners(
      window,
      [`scroll`, `resize`, `load`,],
      onWindowScroll.bind(null, sectionsOffsets)
    );
  }

  /* scrollspy */

  /* form select */

  const customSelects = Array.from(document.querySelectorAll(SELECT));

  const chooseOption = (select, option) => {
    const currentOption = select.querySelector(`.${SELECT_CURRENT_OPTION_CLASS}`);
    const selectButton = select.querySelector(`${SELECT_BUTTON}>span`);
    const selectInput = select.querySelector(`.${SELECT_INPUT}`);

    if (currentOption) {
      currentOption.classList.remove(SELECT_CURRENT_OPTION_CLASS);
    }

    option.classList.add(SELECT_CURRENT_OPTION_CLASS);
    selectInput.value = option.textContent;
    selectButton.textContent = option.textContent;
  };

  const onOptionClick = (evt) => {
    evt.preventDefault();

    const select = evt.target.closest(SELECT);

    chooseOption(select, evt.target);
    toggleSelectList(select);
  };

  const toggleSelectList = (select) => {
    const list = select.querySelector(SELECT_LIST);
    list.classList.toggle(SELECT_ACTIVE_CLASS);

    const isListOpen = list.classList.contains(SELECT_ACTIVE_CLASS);

    isListOpen
      ? list.addEventListener(`click`, onOptionClick)
      : list.removeEventListener(`click`, onOptionClick);
  };

  const onSelectClick = (select, evt) => {
    evt.preventDefault();

    toggleSelectList(select);
  };

  if (customSelects.length) {
    customSelects.map((select) => {
      const selectButton = select.querySelector(SELECT_BUTTON);

      selectButton.addEventListener(`click`, onSelectClick.bind(null, select));
    });
  }

  /* form select */

  /* date picker */

  if (document.querySelectorAll(FORM_DATE).length) {
    flatpickr(FORM_DATE, {
      altFormat: FORM_DATE_FORMAT,
      altInput: true,
    });
  }

  /* date picker */

  /* input masks */

  const formMasks = Array.from(document.querySelectorAll(FORM_MASK));

  if (formMasks) {
    formMasks.map((formMask) => {
      const maskType = formMask.dataset.mask;

      MaskTemplates[maskType].mask(formMask);
    });
  }

  /* input masks */

  /* form file */

  const fileUploads = Array.from(document.querySelectorAll(FILE));
  const fileApi = window.File && window.FileReader && window.FileList && window.Blob;

  const addFile = (fileInput) => {
    const fileUpload = fileInput.parentNode.querySelector(FILE_FIELD);
    const fileLabel = fileUpload.querySelector(FILE_MARK);
    let fileName = ``;

    if (fileApi && fileInput.files[0]) {
      fileName = fileInput.files[0].name;
    } else {
      fileName = fileInput.value;
    }

    if (!fileName.length) {
      return;
    }

    fileLabel.textContent = fileName;
  };

  const handleFileChange = (evt) => {
    addFile(evt.target);
  };

  if (fileUploads) {
    fileUploads.map((file) => {
      const fileInput = file.querySelector(`.${FILE_INPUT}`);

      fileInput.addEventListener(`change`, handleFileChange);
    });
  }

  /* form file */

  /* add file form */

  const addFileWrapper = document.querySelector(ADD_DOC);

  const closeAddFileBox = () => {
    addFileWrapper.classList.remove(ADD_DOC_VISIBLE);

    setTimeout(() => {
      addFileWrapper.classList.remove(ADD_DOC_ACTIVE);
    }, 250);

    const addFileButtonClose = addFileWrapper.querySelector(ADD_DOC_CLOSE_BUTTON);
    addFileButtonClose.removeEventListener(`click`, handleCloseFileButtonClick);
  };

  const handleCloseFileButtonClick = () => {
    closeAddFileBox();
  };

  const openAddFileBox = () => {
    addFileWrapper.classList.add(ADD_DOC_ACTIVE);

    setTimeout(() => {
      addFileWrapper.classList.add(ADD_DOC_VISIBLE);
    }, 200);

    const addFileButtonClose = addFileWrapper.querySelector(ADD_DOC_CLOSE_BUTTON);
    addFileButtonClose.addEventListener(`click`, handleCloseFileButtonClick);
  };

  const handleAddFileButtonClick = () => {
    openAddFileBox();
  };

  if (addFileWrapper) {
    const addFileButton = addFileWrapper.querySelector(ADD_DOC_BUTTON);

    addFileButton.addEventListener(`click`, handleAddFileButtonClick);
  }

  /* add file form */
});
