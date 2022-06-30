function SAValidation() {
	var _this = this;
	var isValidating = {
		activeCase: null,
		fieldList: {}
	};
	var houseForSaleSign = null;
	var landForSaleSign = null;
	var buildingHouseForSaleSign = null;
	var newPlanForSaleSign = null;
	var villaForSaleSign = null;
	var houseForRentSign = null;
	var buildingHouseForRentSign = null;
	var validationType = {
		general: 0,
		valuation: 1,
		live: 2,
		marketReport: 3
	};
	var validationList = null;

	_this.init = function () {
		loadValidation();
		bindEvent();
	};

	function hasValueV2(value) {
		return (typeof value != undefined && value != undefined && value != null && value != "") || (value == false);
	}

	function bindEvent() {
		$('body').on('change', '#listingTypeId', function (e) {
			e.preventDefault();
			loadValidation();
		});

		$('body').on('change', '#propertyTypeId', function (e) {
			e.preventDefault();
			loadValidation();
		});

		$('body').on('change', '#afterSigningContract', function (e) {
			e.preventDefault();
			loadValidation();
		});
	}

	function loadValidation() {
		// clearAllErrors();
		initVAR();
		initDOM();
	}

	function initDOM() {
		clearAllRequiredField();
		showGeneralRequiredField();
		showRequiredField();
		showValuationRequiredField();
	}

	function clearAllRequiredField() {
		$('.required.validation-required').remove();
	}

	function clearRequiredField(fieldId) {
		$('label[for="' + fieldId + '"] + .required.validation-required').remove();
	}

	function clearAllErrors(id) {
		if (!hasValue(id)) {
			$('.has-error').removeClass('has-error');
			$('.help-block.sa-error-wrapper').remove();
			$('.help-block.sa-error').remove();
		} else {
			clearErrorById(id);
		}
	}

	function clearErrorById(id) {
		if (hasValue(id)) {
			for (var i = 0; i < validationList.length; i++) {
				try {
					validationList[i].requiredFieldList[id].deleteError();
				} catch (e) {
					$('label[for="' + id + '"]').closest('.form-group').removeClass('has-error');
					$('[id^=' + id + '] .help-block.sa-error-wrapper').remove();
					$('[id^=' + id + '] .help-block.sa-error').remove();
				}
			}
		}
	}

	function initVAR() {
		houseForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 11);
		landForSaleSign = (Window.sa.data.listingTypeId() == 1 && (Window.sa.data.propertyTypeId() == 13 || Window.sa.data.propertyTypeId() == 14));
		buildingHouseForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 8);
		newPlanForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 12);
		villaForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 9);
		houseForRentSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 2);
		buildingHouseForRentSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 1);

		_this.validationType = validationType;

		delete _this.validation;
		delete _this.generalValidation;
		delete _this.generalLiveValidation;
		delete _this.valuationValidation;

		_this.generalValidation = new SAGeneralValidation();
		_this.generalLiveValidation = new SAGeneralLiveValidation();
		_this.valuationValidation = new SAValuationValidation();
		_this.marketReportValidation = new SAMarketReportValidation();

		if (houseForSaleSign == true) {
			_this.validation = new SAHouseForSaleValidation();
		} else {
			if (landForSaleSign == true) {
				_this.validation = new SALandForSaleValidation();
			} else {
				if (newPlanForSaleSign == true) {
					_this.validation = new SANewPlanForSaleValidation();
				} else {
					if (buildingHouseForSaleSign == true) {
						_this.validation = new SABuildingHouseForSaleValidation();
					} else {
						if (villaForSaleSign == true) {
							_this.validation = new SAVillaForSaleValidation();
						} else {
							if (houseForRentSign == true) {
								_this.validation = new SAHouseForRentValidation();
							} else {
								if (buildingHouseForRentSign == true) {
									_this.validation = new SABuildingHouseForRentValidation();
								}
							}
						}
					}
				}
			}
		}

		_this.generalValidation.init();
		_this.generalLiveValidation.init();
		_this.valuationValidation.init();
		_this.marketReportValidation.init();

		if (hasValue(_this.validation)) {
			_this.validation.init();
			// _this.validation.requiredFieldList = _this.validation.requiredFieldList.concat(_this.generalLiveValidation.requiredFieldList);
			_this.validation.requiredFieldList = $.extend(true, _this.validation.requiredFieldList, _this.generalLiveValidation.requiredFieldList);
		}

		_this.validateFieldById = function (id, type) {
			var field = null;
			clearAllErrors(id);
			if (hasValueV2(type)) {
				if (hasValue(validationList[type].requiredFieldList[id])) {
					field = validationList[type].requiredFieldList[id];
				}
			}
			return validateField(field);
		};

		_this.clearAllErrors = clearAllErrors;
		_this.validate = function (onlyGeneral) {
			var validAll = true;
			// clearAllErrors();
			validAll = generalValidate();
			if (onlyGeneral == false) {
				var _validation = null;
				_validation = _this.validation;
				if (hasValue(_validation)) {
					for (var i in _validation.requiredFieldList) {
						var validField = true;
						// validField = validateField(_this.validation.requiredFieldList[i]);
						validField = _this.validateFieldById(_validation.requiredFieldList[i].id, validationType.live);
						validAll = validAll && validField;
						console.log(_validation.requiredFieldList[i]);
						try {
							console.log(Window.sa.data[_validation.requiredFieldList[i].id]());
						} catch (e) {
							//
						}
						console.log(validField);
						console.log(validAll);
					}
				}
			}

			return validAll;
		};
		_this.valuationValidate = valuationValidate;
		_this.marketReportValidate = marketReportValidate;

		validationList = [
			_this.generalValidation,
			_this.valuationValidation,
			_this.validation,
			_this.marketReportValidation
		];
	}

	function showRequiredField() {
		// showValuationRequiredField();
		var _validation = _this.validation;
		if (hasValue(_validation)) {
			var _validationFieldList = _validation.requiredFieldList;
			for (var i in _validationFieldList) {
				if (hasValue(_validationFieldList[i].rule)) {
					if (hasValue(_validationFieldList[i].showHideRequired)) {
						_validationFieldList[i].showHideRequired();
					} else {
						$('label[for="' + _validationFieldList[i].id + '"]').after('<span class="required validation-required"> (*)</span>');
					}
				} else {
					$('label[for="' + _validationFieldList[i].id + '"]').after('<span class="required validation-required"> (*)</span>');
				}
			}
		}
	}

	function showValuationRequiredField() {
		if (houseForSaleSign) {
			var _validation = _this.valuationValidation;
			if (hasValue(_validation)) {
				var _validationFieldList = _validation.requiredFieldList;
				for (var i in _validationFieldList) {
					clearRequiredField(_validationFieldList[i].id);
					if (hasValue(_validationFieldList[i].rule)) {
						if (hasValue(_validationFieldList[i].showHideRequired)) {
							_validationFieldList[i].showHideRequired();
						} else {
							$('label[for="' + _validationFieldList[i].id + '"]').after('<span class="required validation-required"> (*)</span>');
						}
					} else {
						$('label[for="' + _validationFieldList[i].id + '"]').after('<span class="required validation-required"> (*)</span>');
					}
				}
			}
		}
	}

	function generalValidate() {
		var validAll = true;
		var _validation = _this.generalValidation;
		var _validValidation = new SAValidValidation();
		_validValidation.init();
		validAll = _validValidation.validate();
		if (hasValue(_validation)) {
			for (var i in _validation.requiredFieldList) {
				var validField = true;
				// validField = validateField(_this.generalValidation.requiredFieldList[i]);
				validField = _this.validateFieldById(_validation.requiredFieldList[i].id, validationType.general);
				validAll = validAll && validField;
				console.log(_validation.requiredFieldList[i]);
				try {
					console.log(Window.sa.data[_validation.requiredFieldList[i].id]());
				} catch (e) {
//
				}
				console.log(validField);
				console.log(validAll);
			}
		}

		return validAll;
	}

	function marketReportValidate() {
		var validAll = true;
		clearAllErrors();
		var _validation = _this.marketReportValidation;
		if (hasValue(_validation)) {
			for (var i in _validation.requiredFieldList) {
				var validField = true;
				// validField = validateField(_this.generalValidation.requiredFieldList[i]);
				validField = _this.validateFieldById(_validation.requiredFieldList[i].id, validationType.marketReport);
				validAll = validAll && validField;
				console.log(_validation.requiredFieldList[i]);
				try {
					console.log(Window.sa.data[_validation.requiredFieldList[i].id]());
				} catch (e) {
//
				}
				console.log(validField);
				console.log(validAll);
			}
		}

		return validAll;
	}

	function valuationValidate() {
		var validAll = true;
		if (houseForSaleSign) {
			clearAllErrors();
			var _validation = _this.valuationValidation;
			if (hasValue(_validation)) {
				for (var i in _validation.requiredFieldList) {
					var validField = true;
					// validField = validateField(_this.generalValidation.requiredFieldList[i]);
					validField = _this.validateFieldById(_validation.requiredFieldList[i].id, validationType.valuation);
					validAll = validAll && validField;
					console.log(_validation.requiredFieldList[i]);
					try {
						console.log(Window.sa.data[_validation.requiredFieldList[i].id]());
					} catch (e) {
//
					}
					console.log(validField);
					console.log(validAll);
				}
			}
		}

		return validAll;
	}

	function validateField(field) {
		var validField = true;
		if (hasValue(field)) {
			var fieldLabel = '';
			var _message = '';
			// clearAllErrors(field.id);
			if (hasValue(field.fieldLabel)) {
				fieldLabel = field.fieldLabel;
			} else {
				fieldLabel = $('#' + field.id).data('label');
			}
			if (hasValue(field.rule)) {
				validField = field.rule.validate();
			} else {
				var fieldValue = Window.sa.data[field.id]();
				validField = hasValueV2(fieldValue);
			}
			if (!validField) {
				if (!hasValue(field.customErrorMessage)) {
					_message = 'Vui lòng nhập giá trị';
				} else {
					_message = field.customErrorMessage();
				}
			}
			if (validField) {
				try {
					field.deleteError();
				} catch (e) {
					$('label[for="' + field.id + '"]').closest('.form-group').removeClass('has-error');
				}
			} else {
				try {
					field.showError();
				} catch (e) {
					$('label[for="' + field.id + '"]').closest('.form-group').addClass('has-error');
				}
				try {
					field.errorMessage();
				} catch (e) {
					$('#' + field.id + '-wrapper .form-group .col-md-12:last-child').append('<span class="help-block sa-error">' + _message + '</span>');
				}
			}
		}
		return validField;
	}

	function showGeneralRequiredField() {
		var _validation = _this.generalValidation;
		if (hasValue(_validation)) {
			for (var i in _validation.requiredFieldList) {
				if (hasValue(_validation.requiredFieldList[i].rule)) {
					if (hasValue(_validation.requiredFieldList[i].showHideRequired)) {
						_validation.requiredFieldList[i].showHideRequired();
					} else {
						$('label[for="' + _validation.requiredFieldList[i].id + '"]').after('<span class="required validation-required"> (*)</span>');
					}
				} else {
					$('label[for="' + _validation.requiredFieldList[i].id + '"]').after('<span class="required validation-required"> (*)</span>');
				}
			}
		}
	}

	function SAHouseForSaleValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'address': {
					id: 'address'
				},
				'sizeLength': {
					id: 'sizeLength'
				},
				'sizeWidth': {
					id: 'sizeWidth'
				},
				'lotSize': {
					id: 'lotSize'
				},
				'floorSize': {
					id: 'floorSize'
				},
				'useRightTypeId': {
					id: 'useRightTypeId'
				},
                'otherHouseShape' : {
                    id: 'otherHouseShape',
                    rule : {
                        validate : function () {
                            let valid = true;
                            const listingType = Window.sa.data.listingTypeId();
                            const houseShape = Window.sa.data.houseShape();
                            const otherHouseShape = Window.sa.data.otherHouseShape();

                            if ($.inArray(houseShape, [194]) > -1 && listingType == 1 ) {
                                if (!hasValue(otherHouseShape)) {
                                    valid = false;
                                }
                            }
                            return valid;

                        }
                    }
                },
				'commissionInput': {
					id: 'commissionInput',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue(Window.sa.data.commissionList());
							if (valid == false) {
								valid = (Window.sa.data.commissionFrom() && Window.sa.data.commissionTo()) || (Window.sa.data.commissionPrice());
								if (!hasValueV2(valid)) {
									valid = false;
								} else {
									valid = true;
								}
							}
							return valid;
						}
					},
					customErrorMessage: function () {
						return 'Vui lòng nhập giá trị.'
					}
				},
				'bedRooms': {
					id: 'bedRooms'
					// rule: {
					// 	validate: function () {
					// 		var valid = true;
					// 		valid = hasValueV2(Window.sa.data.bedRooms());
					// 		if (valid) {
					// 			valid = (Window.sa.data.bedRooms() >= 0);
					// 		}
					// 		return valid;
					// 	}
					// }
				},
				'bathRooms': {
					id: 'bathRooms'
					// rule: {
					// 	validate: function () {
					// 		var valid = true;
					// 		valid = hasValueV2(Window.sa.data.bathRooms());
					// 		if (valid) {
					// 			valid = (Window.sa.data.bathRooms() >= 0);
					// 		}
					// 		return valid;
					// 	}
					// }
				},
				'position': {
					id: 'position'
				},
				'afterSigningContract': {
					id: 'afterSigningContract',
					errorMessage: function () {
						$('.contract-group').append('<div class="col-md-12 sa-error-wrapper"><span class="help-block sa-error">Vui lòng nhập giá trị.</span></div>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var afterSigningContract = Window.sa.data.afterSigningContract();
							if (!hasValue(afterSigningContract)) {
								valid = moment($('#moveInDate').val(), 'DD/MM/YYYY').isValid();
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var afterSigningContract = Window.sa.data.afterSigningContract();
						if (!hasValue(afterSigningContract)) {
							$('label[for="moveInDate"]').after('<span class="required validation-required"> (*)</span>');
						} else {
							$('label[for="afterSigningContract"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					showError: function () {
						$('.contract-group').addClass('has-error');
					},
					deleteError: function () {
						$('.contract-group').removeClass('has-error');
						$('.contract-group .sa-error-wrapper').remove();
					}
				},
				'moveInDate': {
					id: 'moveInDate',
					errorMessage: function () {
						$('.contract-group').append('<div class="col-md-12 sa-error-wrapper"><span class="help-block sa-error">Vui lòng nhập giá trị.</span></div>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var moveInDate = Window.sa.data.moveInDate();
							var afterSigningContract = Window.sa.data.afterSigningContract();
							if (hasValue(moveInDate)) {
								valid = moment($('#moveInDate').val(), 'DD/MM/YYYY').isValid();
							} else {
								valid = afterSigningContract;
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var afterSigningContract = Window.sa.data.afterSigningContract();
						if (!hasValue(afterSigningContract)) {
							$('label[for="moveInDate"] + .required.validation-required').remove();
							$('label[for="moveInDate"]').after('<span class="required validation-required"> (*)</span>');
						} else {
							$('label[for="afterSigningContract"] + .required.validation-required').remove();
							$('label[for="afterSigningContract"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					showError: function () {
						$('.contract-group').addClass('has-error');
					},
					deleteError: function () {
						$('.contract-group').removeClass('has-error');
						$('.contract-group .sa-error-wrapper').remove();
					}
				},
				'statusQuoId': {
					id: 'statusQuoId'
				},
				'directionId': {
					id: 'directionId'
				},
				'legalStatusList-multi-column-check-list': {
					id: 'legalStatusList-multi-column-check-list',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue(Window.sa.data.legalStatusList());
							return valid;
						}
					}
				},
				'photoGcns': {
					id: 'photoGcns',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue($('#photoGcns-wrapper').getListPhotos());
							return valid;
						}
					},
					showHideRequired: function () {
						$('label[for="photoGcns"]').after('<span class="required validation-required"> (*)</span>');
					}
				},
                'planing-type': {
                    id: 'planing-type',
                    rule: {
                        validate: function () {
                            var valid = true;
                            if(Window.sa.data.havePlanning() == 1) {
                                valid = hasValue(Window.sa.data.planingType());
							}
                            return valid;
                        }
                    }
                },
                'planing-area': {
                    id: 'planing-area',
                    rule: {
                        validate: function () {
                            var valid = true;
                            if(Window.sa.data.havePlanning() == 1) {
                                valid = isVal(Window.sa.data.planingArea());
                            }
                            return valid;
                        }
                    }
                },
			};
		}
	}

	function SALandForSaleValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'address': {
					id: 'address'
				},
				'sizeLength': {
					id: 'sizeLength'
				},
				'sizeWidth': {
					id: 'sizeWidth'
				},
				'lotSize': {
					id: 'lotSize'
				},
				'useRightTypeId': {
					id: 'useRightTypeId'
				},
				'commissionInput': {
					id: 'commissionInput',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue(Window.sa.data.commissionList());
							if (valid == false) {
								valid = (Window.sa.data.commissionFrom() && Window.sa.data.commissionTo()) || (Window.sa.data.commissionPrice());
								if (!hasValueV2(valid)) {
									valid = false;
								} else {
									valid = true;
								}
							}
							return valid;
						}
					},
					customErrorMessage: function () {
						return 'Vui lòng nhập giá trị.'
					}
				},
				'position': {
					id: 'position'
				},
				'legalStatusList-multi-column-check-list': {
					id: 'legalStatusList-multi-column-check-list',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue(Window.sa.data.legalStatusList());
							return valid;
						}
					}
				},
				'photoGcns': {
					id: 'photoGcns',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue($('#photoGcns-wrapper').getListPhotos());
							return valid;
						}
					},
					showHideRequired: function () {
						$('label[for="photoGcns"]').after('<span class="required validation-required"> (*)</span>');
					}
				}
			};
            if (Window.sa.data.propertyTypeId() == 13) {
                _this.requiredFieldList['planing-type'] = {
                    id: 'planing-type',
                    rule: {
                        validate: function () {
                            var valid = true;
                            if(Window.sa.data.havePlanning() == 1) {
                                valid = hasValue(Window.sa.data.planingType());
                            }
                            return valid;
                        }
                    }
                };
                _this.requiredFieldList['planing-area'] = {
                    id: 'planing-area',
                    rule: {
                        validate: function () {
                            var valid = true;
                            if(Window.sa.data.havePlanning() == 1) {
                                valid = hasValue(Window.sa.data.planingArea());
                            }
                            return valid;
                        }
                    }
                };
            }
			if (Window.sa.data.propertyTypeId() == 14) {
                _this.requiredFieldList.projectId = {
                    id: 'projectId'
				};
			}
		}
	}

	function SANewPlanForSaleValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'floorSize': {
					id: 'floorSize'
				},
				'useRightTypeId': {
					id: 'useRightTypeId'
				},
				'commissionInput': {
					id: 'commissionInput',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue(Window.sa.data.commissionList());
							if (valid == false) {
								valid = (Window.sa.data.commissionFrom() && Window.sa.data.commissionTo()) || (Window.sa.data.commissionPrice());
								if (!hasValueV2(valid)) {
									valid = false;
								} else {
									valid = true;
								}
							}
							return valid;
						}
					},
					customErrorMessage: function () {
						return 'Vui lòng nhập giá trị.'
					}
				},
				'bedRooms': {
					id: 'bedRooms',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.bedRooms());
							if (valid) {
								valid = (Window.sa.data.bedRooms() >= 0);
							}
							return valid;
						}
					}
				},
				'bathRooms': {
					id: 'bathRooms',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.bathRooms());
							if (valid) {
								valid = (Window.sa.data.bathRooms() >= 0);
							}
							return valid;
						}
					}
				},
				'position': {
					id: 'position'
				},
				'afterSigningContract': {
					id: 'afterSigningContract',
					errorMessage: function () {
						$('.contract-group').append('<div class="col-md-12 sa-error-wrapper"><span class="help-block sa-error">Vui lòng nhập giá trị</span></div>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var afterSigningContract = Window.sa.data.afterSigningContract();
							if (!hasValue(afterSigningContract)) {
								valid = moment($('#moveInDate').val(), 'DD/MM/YYYY').isValid();
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var afterSigningContract = Window.sa.data.afterSigningContract();
						if (!hasValue(afterSigningContract)) {
							$('label[for="moveInDate"]').after('<span class="required validation-required"> (*)</span>');
						} else {
							$('label[for="afterSigningContract"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					showError: function () {
						$('.contract-group').addClass('has-error');
					},
					deleteError: function () {
						$('.contract-group').removeClass('has-error');
						$('.contract-group .sa-error-wrapper').remove();
					}
				},
				'moveInDate': {
					id: 'moveInDate',
					errorMessage: function () {
						$('.contract-group').append('<div class="col-md-12 sa-error-wrapper"><span class="help-block sa-error">Vui lòng nhập giá trị</span></div>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var moveInDate = Window.sa.data.moveInDate();
							var afterSigningContract = Window.sa.data.afterSigningContract();
							if (hasValue(moveInDate)) {
								valid = moment($('#moveInDate').val(), 'DD/MM/YYYY').isValid();
							} else {
								valid = afterSigningContract;
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var afterSigningContract = Window.sa.data.afterSigningContract();
						if (!hasValue(afterSigningContract)) {
							$('label[for="moveInDate"] + .required.validation-required').remove();
							$('label[for="moveInDate"]').after('<span class="required validation-required"> (*)</span>');
						} else {
							$('label[for="afterSigningContract"] + .required.validation-required').remove();
							$('label[for="afterSigningContract"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					showError: function () {
						$('.contract-group').addClass('has-error');
					},
					deleteError: function () {
						$('.contract-group').removeClass('has-error');
						$('.contract-group .sa-error-wrapper').remove();
					}
				},
				'statusQuoId': {
					id: 'statusQuoId'
				},
				'photoGcns': {
					id: 'photoGcns',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue($('#photoGcns-wrapper').getListPhotos());
							return valid;
						}
					},
					showHideRequired: function () {
						$('label[for="photoGcns"]').after('<span class="required validation-required"> (*)</span>');
					}
				}
			};
		}
	}

	function SABuildingHouseForSaleValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'floorSize': {
					id: 'floorSize'
				},
				'useRightTypeId': {
					id: 'useRightTypeId'
				},
				'commissionInput': {
					id: 'commissionInput',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue(Window.sa.data.commissionList());
							if (valid == false) {
								valid = (Window.sa.data.commissionFrom() && Window.sa.data.commissionTo()) || (Window.sa.data.commissionPrice());
								if (!hasValueV2(valid)) {
									valid = false;
								} else {
									valid = true;
								}
							}
							return valid;
						}
					},
					customErrorMessage: function () {
						return 'Vui lòng nhập giá trị.';
					}
				},
                'buildingFloors': {
                    id: 'buildingFloors',
                    rule: {
                        validate: function () {
                            var valid = true;
                            valid = hasValueV2(Window.sa.data.buildingFloors());
                            if(valid) {
                            	if (Window.sa.data.buildingFloors() < -5 || Window.sa.data.buildingFloors() > Window.sa.data.numberFloor()) {
                            		valid = false;
                                }
							}
                            return valid;
                        }
                    },
                    errorMessage: function () {
                    	if ( !hasValueV2(Window.sa.data.buildingFloors())) {
                            $('#buildingFloors-wrapper .form-group .col-md-12 + .col-md-12').closest('.col-md-12').append('<span class="help-block sa-error">Số tầng chưa được nhập</span>');
						} else {
                            $('#buildingFloors-wrapper .form-group .col-md-12 + .col-md-12').closest('.col-md-12').append('<span class="help-block sa-error">Số tầng phải nhỏ hơn số tầng tòa nhà</span>');
						}

                    }
                },
				'bedRooms': {
					id: 'bedRooms',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.bedRooms());
							if (valid) {
								valid = (Window.sa.data.bedRooms() >= 0);
							}
							return valid;
						}
					}
				},
				'bathRooms': {
					id: 'bathRooms',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.bathRooms());
							if (valid) {
								valid = (Window.sa.data.bathRooms() >= 0);
							}
							return valid;
						}
					}
				},
				'afterSigningContract': {
					id: 'afterSigningContract',
					errorMessage: function () {
						$('.contract-group').append('<div class="col-md-12 sa-error-wrapper"><span class="help-block sa-error">Vui lòng nhập giá trị</span></div>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var afterSigningContract = Window.sa.data.afterSigningContract();
							if (!hasValue(afterSigningContract)) {
								valid = moment($('#moveInDate').val(), 'DD/MM/YYYY').isValid();
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var afterSigningContract = Window.sa.data.afterSigningContract();
						if (!hasValue(afterSigningContract)) {
							$('label[for="moveInDate"]').after('<span class="required validation-required"> (*)</span>');
						} else {
							$('label[for="afterSigningContract"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					showError: function () {
						$('.contract-group').addClass('has-error');
					},
					deleteError: function () {
						$('.contract-group').removeClass('has-error');
						$('.contract-group .sa-error-wrapper').remove();
					}
				},
				'moveInDate': {
					id: 'moveInDate',
					errorMessage: function () {
						$('.contract-group').append('<div class="col-md-12 sa-error-wrapper"><span class="help-block sa-error">Vui lòng nhập giá trị</span></div>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var moveInDate = Window.sa.data.moveInDate();
							var afterSigningContract = Window.sa.data.afterSigningContract();
							if (hasValue(moveInDate)) {
								valid = moment($('#moveInDate').val(), 'DD/MM/YYYY').isValid();
							} else {
								valid = afterSigningContract;
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var afterSigningContract = Window.sa.data.afterSigningContract();
						if (!hasValue(afterSigningContract)) {
							$('label[for="moveInDate"] + .required.validation-required').remove();
							$('label[for="moveInDate"]').after('<span class="required validation-required"> (*)</span>');
						} else {
							$('label[for="afterSigningContract"] + .required.validation-required').remove();
							$('label[for="afterSigningContract"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					showError: function () {
						$('.contract-group').addClass('has-error');
					},
					deleteError: function () {
						$('.contract-group').removeClass('has-error');
						$('.contract-group .sa-error-wrapper').remove();
					}
				},
				'statusQuoId': {
					id: 'statusQuoId'
				},
				'photoGcns': {
					id: 'photoGcns',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue($('#photoGcns-wrapper').getListPhotos());
							return valid;
						}
					},
					showHideRequired: function () {
						$('label[for="photoGcns"]').after('<span class="required validation-required"> (*)</span>');
					}
				},
				'buildingId' : {
                    id: 'buildingId'
				}
			};
		}
	}

	function SAVillaForSaleValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'address': {
					id: 'address'
				},
				'sizeLength': {
					id: 'sizeLength'
				},
				'sizeWidth': {
					id: 'sizeWidth'
				},
				'lotSize': {
					id: 'lotSize'
				},
				'floorSize': {
					id: 'floorSize'
				},
				'useRightTypeId': {
					id: 'useRightTypeId'
				},
                'otherHouseShape' : {
                    id: 'otherHouseShape',
                    rule : {
                        validate : function () {
                            let valid = true;
                            const listingType = Window.sa.data.listingTypeId();
                            const houseShape = Window.sa.data.houseShape();
                            const otherHouseShape = Window.sa.data.otherHouseShape();

                            if ($.inArray(houseShape, [194]) > -1 && listingType == 1 ) {
                                if (!hasValue(otherHouseShape)) {
                                    valid = false;
                                }
                            }
                            return valid;

                        }
                    }
                },
				'commissionInput': {
					id: 'commissionInput',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue(Window.sa.data.commissionList());
							if (valid == false) {
								valid = (Window.sa.data.commissionFrom() && Window.sa.data.commissionTo()) || (Window.sa.data.commissionPrice());
								if (!hasValueV2(valid)) {
									valid = false;
								} else {
									valid = true;
								}
							}
							return valid;
						}
					},
					customErrorMessage: function () {
						return 'Vui lòng nhập giá trị.';
					}
				},
				'bedRooms': {
					id: 'bedRooms',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.bedRooms());
							if (valid) {
								valid = (Window.sa.data.bedRooms() >= 0);
							}
							return valid;
						}
					}
				},
				'bathRooms': {
					id: 'bathRooms',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.bathRooms());
							if (valid) {
								valid = (Window.sa.data.bathRooms() >= 0);
							}
							return valid;
						}
					}
				},
				'position': {
					id: 'position'
				},
				'afterSigningContract': {
					id: 'afterSigningContract',
					errorMessage: function () {
						$('.contract-group').append('<div class="col-md-12 sa-error-wrapper"><span class="help-block sa-error">Vui lòng nhập giá trị</span></div>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var afterSigningContract = Window.sa.data.afterSigningContract();
							if (!hasValue(afterSigningContract)) {
								valid = moment($('#moveInDate').val(), 'DD/MM/YYYY').isValid();
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var afterSigningContract = Window.sa.data.afterSigningContract();
						if (!hasValue(afterSigningContract)) {
							$('label[for="moveInDate"]').after('<span class="required validation-required"> (*)</span>');
						} else {
							$('label[for="afterSigningContract"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					showError: function () {
						$('.contract-group').addClass('has-error');
					},
					deleteError: function () {
						$('.contract-group').removeClass('has-error');
						$('.contract-group .sa-error-wrapper').remove();
					}
				},
				'moveInDate': {
					id: 'moveInDate',
					errorMessage: function () {
						$('.contract-group').append('<div class="col-md-12 sa-error-wrapper"><span class="help-block sa-error">Vui lòng nhập giá trị</span></div>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var moveInDate = Window.sa.data.moveInDate();
							var afterSigningContract = Window.sa.data.afterSigningContract();
							if (hasValue(moveInDate)) {
								valid = moment($('#moveInDate').val(), 'DD/MM/YYYY').isValid();
							} else {
								valid = afterSigningContract;
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var afterSigningContract = Window.sa.data.afterSigningContract();
						if (!hasValue(afterSigningContract)) {
							$('label[for="moveInDate"] + .required.validation-required').remove();
							$('label[for="moveInDate"]').after('<span class="required validation-required"> (*)</span>');
						} else {
							$('label[for="afterSigningContract"] + .required.validation-required').remove();
							$('label[for="afterSigningContract"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					showError: function () {
						$('.contract-group').addClass('has-error');
					},
					deleteError: function () {
						$('.contract-group').removeClass('has-error');
						$('.contract-group .sa-error-wrapper').remove();
					}
				},
				'statusQuoId': {
					id: 'statusQuoId'
				},
				'legalStatusList-multi-column-check-list': {
					id: 'legalStatusList-multi-column-check-list',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue(Window.sa.data.legalStatusList());
							return valid;
						}
					}
				},
				'photoGcns': {
					id: 'photoGcns',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue($('#photoGcns-wrapper').getListPhotos());
							return valid;
						}
					},
					showHideRequired: function () {
						$('label[for="photoGcns"]').after('<span class="required validation-required"> (*)</span>');
					}
				}
			};
		}
	}

	function SAHouseForRentValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'address': {
					id: 'address'
				},
				'sizeLength': {
					id: 'sizeLength'
				},
				'sizeWidth': {
					id: 'sizeWidth'
				},
				'floorSize': {
					id: 'floorSize'
				},
				'minContractDeadline': {
					id: 'minContractDeadline'
				},
				'depositText': {
					id: 'depositText',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.depositText());
							if (valid) {
								valid = (Window.sa.data.depositText() >= 0);
							}
							return valid;
						}
					}
				},
				'contractTime': {
					id: 'contractTime',
					errorMessage: function () {
						$('#commissionList-group-wrapper .sa-error').remove();
						$('#commissionList-group-wrapper').append('<span class="help-block sa-error">Vui lòng chọn giá trị cho thời gian thuê và hoa hồng.</span>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var commissionList = Window.sa.data.commissionList();
							if (commissionList.length == 0) {
								valid = false;
							}
							return valid;
						}
					},
					showError: function () {
						$('#commissionList-group-wrapper').addClass('has-error');
					},
					deleteError: function () {
						$('#commissionList-group-wrapper').removeClass('has-error');
						$('#commissionList-group-wrapper .sa-error').remove();
					}
				},
				'commissionPer': {
					id: 'commissionPer',
					errorMessage: function () {
						$('#commissionList-group-wrapper .sa-error').remove();
						$('#commissionList-group-wrapper').append('<span class="help-block sa-error">Vui lòng chọn giá trị cho thời gian thuê và hoa hồng.</span>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var commissionList = Window.sa.data.commissionList();
							if (commissionList.length == 0) {
								valid = false;
							}
							return valid;
						}
					},
					showError: function () {
						$('#commissionList-group-wrapper').addClass('has-error');
					},
					deleteError: function () {
						$('#commissionList-group-wrapper').removeClass('has-error');
						$('#commissionList-group-wrapper .sa-error').remove();
					}
				},
				'bedRooms': {
					id: 'bedRooms'
					// rule: {
					// 	validate: function () {
					// 		var valid = true;
					// 		valid = hasValueV2(Window.sa.data.bedRooms());
					// 		if (valid) {
					// 			valid = (Window.sa.data.bedRooms() >= 0);
					// 		}
					// 		return valid;
					// 	}
					// }
				},
				'bathRooms': {
					id: 'bathRooms'
					// rule: {
					// 	validate: function () {
					// 		var valid = true;
					// 		valid = hasValueV2(Window.sa.data.bathRooms());
					// 		if (valid) {
					// 			valid = (Window.sa.data.bathRooms() >= 0);
					// 		}
					// 		return valid;
					// 	}
					// }
				},
				'position': {
					id: 'position'
				}
			};
		}
	}

	function SABuildingHouseForRentValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'floorSize': {
					id: 'floorSize'
				},
				'minContractDeadline': {
					id: 'minContractDeadline'
				},
				'depositText': {
					id: 'depositText',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.depositText());
							if (valid) {
								valid = (Window.sa.data.depositText() >= 0);
							}
							return valid;
						}
					}
				},
				'contractTime': {
					id: 'contractTime',
					errorMessage: function () {
						$('#commissionList-group-wrapper .sa-error').remove();
						$('#commissionList-group-wrapper').append('<span class="help-block sa-error">Vui lòng chọn giá trị cho thời gian thuê và hoa hồng.</span>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var commissionList = Window.sa.data.commissionList();
							if (commissionList.length == 0) {
								valid = false;
							}
							return valid;
						}
					},
					showError: function () {
						$('#commissionList-group-wrapper').addClass('has-error');
					},
					deleteError: function () {
						$('#commissionList-group-wrapper').removeClass('has-error');
						$('#commissionList-group-wrapper .sa-error').remove();
					}
				},
				'commissionPer': {
					id: 'commissionPer',
					errorMessage: function () {
						$('#commissionList-group-wrapper .sa-error').remove();
						$('#commissionList-group-wrapper').append('<span class="help-block sa-error">Vui lòng chọn giá trị cho thời gian thuê và hoa hồng.</span>');
					},
					rule: {
						validate: function () {
							var valid = true;
							var commissionList = Window.sa.data.commissionList();
							if (commissionList.length == 0) {
								valid = false;
							}
							return valid;
						}
					},
					showError: function () {
						$('#commissionList-group-wrapper').addClass('has-error');
					},
					deleteError: function () {
						$('#commissionList-group-wrapper').removeClass('has-error');
						$('#commissionList-group-wrapper .sa-error').remove();
					}
				},
				'bedRooms': {
					id: 'bedRooms',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValueV2(Window.sa.data.bedRooms());
							if (valid) {
								valid = (Window.sa.data.bedRooms() >= 0);
							}
							return valid;
						}
					}
				},
				'bathRooms': {
					id: 'bathRooms'
					// rule: {
					// 	validate: function () {
					// 		var valid = true;
					// 		valid = hasValueV2(Window.sa.data.bathRooms());
					// 		if (valid) {
					// 			valid = (Window.sa.data.bathRooms() >= 0);
					// 		}
					// 		return valid;
					// 	}
					// }
				}
			};
		}
	}

	function SAGeneralValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'sourceId': {
					id: 'sourceId'
				},
				'propertyTypeId': {
					id: 'propertyTypeId'
				},
				'listingTypeId': {
					id: 'listingTypeId'
				},
				'crawlerStatus': {
					id: 'crawlerStatus'
				},
				'agentId': {
					id: 'agentId',
					rule: {
						validate: function () {
							var valid = true;
							var crawlerStatus = Window.sa.data.crawlerStatus();
							if (crawlerStatus == 3) {
								if (!hasValue(Window.sa.data.agentId())) {
									valid = false;
								}
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var crawlerStatus = Window.sa.data.crawlerStatus();
						if (crawlerStatus == 3) {
							$('label[for="agentId"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					errorMessage: function () {
						var crawlerStatus = Window.sa.data.crawlerStatus();
						if (crawlerStatus == 3) {
							if (!hasValue(Window.sa.data.agentId())) {
								$('#agentId-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Chưa chọn agent</span>');
							}
						}
					}
				},
				'email': {
					id: 'email',
					rule: {
						validate: function () {
							var valid = true;
							// var crawlerStatus = Window.sa.data.crawlerStatus();
							// if (crawlerStatus == 2 || crawlerStatus == 7) {
							// 	var email = Window.sa.data.email();
							// 	if (hasValue(email)) {
							// 		if (!isEmail(email)) {
							// 			valid = false;
							// 		}
							// 	}
							// }
							var email = Window.sa.data.email();
							if (hasValue(email)) {
								if (!isEmail(email)) {
									valid = false;
								}
							}
							return valid;
						}
					},
					showHideRequired: function () {

					},
					errorMessage: function () {
						// var crawlerStatus = Window.sa.data.crawlerStatus();
						// if (crawlerStatus == 2 || crawlerStatus == 7) {
						// 	var email = Window.sa.data.email();
						// 	if (hasValue(email)) {
						// 		if (!isEmail(email)) {
						// 			$('#email-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Email chưa đúng định dạng</span>');
						// 		}
						// 	}
						// }
						var email = Window.sa.data.email();
						if (hasValue(email)) {
							if (!isEmail(email)) {
								$('#email-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Email chưa đúng định dạng</span>');
							}
						}
					}
				},
				'name': {
					id: 'name',
					rule: {
						validate: function () {
							var valid = true;
							var crawlerStatus = Window.sa.data.crawlerStatus();
							if (crawlerStatus == 2 || crawlerStatus == 7) {
								if (!hasValue(Window.sa.data.name())) {
									valid = false;
								}
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var crawlerStatus = Window.sa.data.crawlerStatus();
						if (crawlerStatus == 2 || crawlerStatus == 7) {
							$('label[for="name"]').after('<span class="required validation-required"> (*)</span>');
						}
					}
				},
				'phone': {
					id: 'phone',
					rule: {
						validate: function () {
							var valid = true;
							// var crawlerStatus = Window.sa.data.crawlerStatus();
							// if (crawlerStatus == 2 || crawlerStatus == 7) {
							// 	var phone = Window.sa.data.phone();
							// 	var phones = Window.sa.data.phones();
							// 	if (!isPhoneNumber(phone)) {
							// 		valid = false;
							// 	} else {
							// 		for (var i = 0; i < phones.length; i++) {
							// 			if (!isPhoneNumber(phones[i].phoneSub)) {
							// 				valid = false;
							// 				break;
							// 			}
							// 		}
							// 	}
							// }
							var crawlerStatus = Window.sa.data.crawlerStatus();
							var phone = Window.sa.data.phone();
							var phones = Window.sa.data.phones();
							if (crawlerStatus == 2 || crawlerStatus == 7) {
								if (!isPhoneNumber(phone)) {
									valid = false;
								} else {
									for (var i = 0; i < phones.length; i++) {
										if (!isPhoneNumber(phones[i].phoneSub)) {
											valid = false;
											break;
										}
									}
								}
							} else {
								if (hasValue(phone)) {
									if (!isPhoneNumber(phone)) {
										valid = false;
									} else {
										for (var i = 0; i < phones.length; i++) {
											if (!isPhoneNumber(phones[i].phoneSub)) {
												valid = false;
												break;
											}
										}
									}
								}
							}
							return valid;
						}
					},
					showHideRequired: function () {
						var crawlerStatus = Window.sa.data.crawlerStatus();
						if (crawlerStatus == 2 || crawlerStatus == 7) {
							$('label[for="phone"]').after('<span class="required validation-required"> (*)</span>');
						}
					},
					errorMessage: function () {
						var crawlerStatus = Window.sa.data.crawlerStatus();
						var phone = Window.sa.data.phone();
						var phones = Window.sa.data.phones();
						if (crawlerStatus == 2 || crawlerStatus == 7) {
							if (!hasValue(phone)) {
								$('#phone-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Vui lòng nhập giá trị</span>');
							} else {
								if (!isPhoneNumber(phone)) {
									$('#phone-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Số điện thoại chủ nhà chưa đúng định dạng</span>');
								} else {
									for (var i = 0; i < phones.length; i++) {
										if (!isPhoneNumber(phones[i].phoneSub)) {
											$('#phone-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Số điện thoại phụ chưa đúng định dạng</span>');
											break;
										}
									}
								}
							}
						} else {
							if (hasValue(phone)) {
								if (!isPhoneNumber(phone)) {
									$('#phone-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Số điện thoại chủ nhà chưa đúng định dạng</span>');
								} else {
									for (var i = 0; i < phones.length; i++) {
										if (!isPhoneNumber(phones[i].phoneSub)) {
											$('#phone-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Số điện thoại phụ chưa đúng định dạng</span>');
											break;
										}
									}
								}
							}
						}
					}
				}
			};
		}
	}

	function SAGeneralLiveValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'latitude': {
					id: 'latitude'
				},
				'longitude': {
					id: 'longitude'
				},
				'price': {
					id: 'price',
					type: {
						min: 0
					}
				},
				'cityId': {
					id: 'cityId'
				},
				'districtId': {
					id: 'districtId'
				},
				'wardId': {
					id: 'wardId'
				},
				'streetId': {
					id: 'streetId',
					errorMessage: function () {
						$('#streetId-wrapper .form-group .col-md-12 .input-group').closest('.col-md-12').append('<span class="help-block sa-error">Vui lòng nhập giá trị.</span>');
					}
				},
				'houseNumber': {
					id: 'houseNumber'
				},
				'photos': {
					id: 'photos',
					rule: {
						validate: function () {
							var valid = true;
							valid = hasValue($('#photos-wrapper').getListPhotos());
							return valid;
						}
					}
				}
			};
		}
	}

	function SAValuationValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'position': {
					id: 'position'
				},
				'lotSize': {
					id: 'lotSize'
				},
				'floorSize': {
					id: 'floorSize'
				},
				'sizeLength': {
					id: 'sizeLength'
				},
				'sizeWidth': {
					id: 'sizeWidth'
				},
				'roadFrontageDistance': {
					id: 'roadFrontageDistance',
					rule: {
						validate: function () {
							var valid = true;
							var roadFrontageDistance = Window.sa.data.roadFrontageDistance();
							if (houseForSaleSign && Window.sa.data.position() == 2) {
								valid = valid && hasValueV2(roadFrontageDistance);
								valid = valid && (roadFrontageDistance >= 0);
							}
							return valid;
						}
					}
				},
				'price': {
					id: 'price',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					}
				},
				'roadPrice': {
					id: 'roadPrice'
				},
				'houseTypeId': {
					id: 'houseTypeId'
				},
				'constructionTypeId': {
					id: 'constructionTypeId',
					rule: {
						validate: function () {
							var valid = true;
							var _constructionTypeId = Window.sa.data.constructionTypeId();
							var _houseTypeId = Window.sa.data.houseTypeId();
							if (_houseTypeId != 89) {
								valid = hasValue(_constructionTypeId);
							}
							return valid;
						}
					}
				},
				'depreciation': {
					id: 'depreciation',
					rule: {
						validate: function () {
							var valid = true;
							if (Window.sa.data.houseTypeId() != 89) {
								valid = hasValueV2(Window.sa.data.depreciation());
							}
							return valid;
						}
					}
				},
				'roadFrontageWidth': {
					id: 'roadFrontageWidth',
					rule: {
						validate: function () {
							var valid = true;
							var roadFrontageWidth = Window.sa.data.roadFrontageWidth();
							if (houseForSaleSign && Window.sa.data.position() == 1) {
								valid = valid && hasValue(roadFrontageWidth);
								valid = valid && (roadFrontageWidth > 0);
							}
							return valid;
						}
					},
					customErrorMessage: function () {
						return 'Vui lòng nhập giá trị.';
					}
				},
				'alleyWidth': {
					id: 'alleyWidth',
					rule: {
						validate: function () {
							var valid = true;
							if (houseForSaleSign && Window.sa.data.position() == 2) {
								valid = hasValue(Window.sa.data.alleyWidth());
								valid = valid && (Window.sa.data.alleyWidth() > 0);
							}
							return valid;
						}
					}
				},
				'widthFrontWay': {
					id: 'widthFrontWay',
					rule: {
						validate: function () {
							var valid = true;
							var _widthFrontWay = Window.sa.data.widthFrontWay();
							var _widthValue = Window.sa.data.widthValue();
							var _position = Window.sa.data.position();
							var _haveBeside = Window.sa.data.haveBeSide();
							if (_position == 1) {
								if (_haveBeside) {
									valid = hasValue(_widthFrontWay) || hasValue(_widthValue);
								}
							} else {
								if (_position == 2) {
									valid = hasValue(_widthFrontWay);
								}
							}
							return valid;
						}
					},
					showHideRequired: function () {
						$('label[for="widthFrontWay"]').after('<span class="required validation-required"> (*)</span>');
						$('label[for="widthFrontWay-alley"]').after('<span class="required validation-required"> (*)</span>');
					},
					showError: function () {
						var _widthFrontWay = Window.sa.data.widthFrontWay();
						var _widthValue = Window.sa.data.widthValue();
						var _position = Window.sa.data.position();
						var _haveBeside = Window.sa.data.haveBeSide();
						if (_position == 1) {
							if (_haveBeside) {
								if (!hasValue(_widthFrontWay) && !hasValue(_widthValue)) {
									$('#widthFrontWay-widthValue-wrapper').addClass('has-error');
								}
							}
						} else {
							if (_position == 2) {
								if (!hasValue(_widthFrontWay)) {
									$('#widthFrontWay-alley-wrapper').addClass('has-error');
								}
							}
						}
					},
					errorMessage: function () {
						var _widthFrontWay = Window.sa.data.widthFrontWay();
						var _widthValue = Window.sa.data.widthValue();
						var _position = Window.sa.data.position();
						var _haveBeside = Window.sa.data.haveBeSide();
						if (_position == 1) {
							if (_haveBeside) {
								if (!hasValue(_widthFrontWay) && !hasValue(_widthValue)) {
									$('#widthFrontWay-widthValue-wrapper-error .help-block.sa-error').remove();
									$('#widthFrontWay-widthValue-wrapper-error').append('<span class="help-block sa-error">Vui lòng nhập ' + $('#widthFrontWay').data('label') + ' hoặc ' + $('#widthValue').data('label') + '</span>');
								}
							}
						} else {
							if (_position == 2) {
								if (!hasValue(_widthFrontWay)) {
									$('#widthFrontWay-alley-wrapper .form-group .col-md-12:last-child').append('<span class="help-block sa-error">Vui lòng nhập giá trị</span>');
								}
							}
						}
					},
					deleteError: function () {
						var _widthFrontWay = Window.sa.data.widthFrontWay();
						var _widthValue = Window.sa.data.widthValue();
						var _position = Window.sa.data.position();
						var _haveBeside = Window.sa.data.haveBeSide();
						if (_position == 1) {
							if (_haveBeside) {
								if (hasValue(_widthFrontWay) || hasValue(_widthValue)) {
									$('#widthFrontWay-widthValue-wrapper-error .help-block.sa-error').remove();
									$('#widthFrontWay-widthValue-wrapper').removeClass('has-error');
								}
							}
						} else {
							if (_position == 2) {
								if (hasValue(_widthFrontWay)) {
									$('#widthFrontWay-alley + .help-block.sa-error').remove();
									$('#widthFrontWay-alley-wrapper').removeClass('has-error');
								}
							}
						}
					}
				},
				'widthValue': {
					id: 'widthValue',
					rule: {
						validate: function () {
							var valid = true;
							var _widthFrontWay = Window.sa.data.widthFrontWay();
							var _widthValue = Window.sa.data.widthValue();
							var _position = Window.sa.data.position();
							var _haveBeside = Window.sa.data.haveBeSide();
							if (_position == 1) {
								if (_haveBeside) {
									valid = hasValue(_widthFrontWay) || hasValue(_widthValue);
								}
							} else {
								if (_position == 2) {
									if (_haveBeside) {
										valid = hasValue(_widthValue);
									}
								}
							}
							return valid;
						}
					},
					showHideRequired: function () {
						$('label[for="widthValue"]').after('<span class="required validation-required"> (*)</span>');
						$('label[for="widthValue-alley"]').after('<span class="required validation-required"> (*)</span>');
					},
					showError: function () {
						var _widthFrontWay = Window.sa.data.widthFrontWay();
						var _widthValue = Window.sa.data.widthValue();
						var _position = Window.sa.data.position();
						var _haveBeside = Window.sa.data.haveBeSide();
						if (_position == 1) {
							if (_haveBeside) {
								if (!hasValue(_widthFrontWay) && !hasValue(_widthValue)) {
									$('#widthFrontWay-widthValue-wrapper').addClass('has-error');
								}
							}
						} else {
							if (_position == 2) {
								if (_haveBeside) {
									if (!hasValue(_widthValue)) {
										$('#widthValue-alley-wrapper').addClass('has-error');
									}
								}
							}
						}
					},
					errorMessage: function () {
						var _widthFrontWay = Window.sa.data.widthFrontWay();
						var _widthValue = Window.sa.data.widthValue();
						var _position = Window.sa.data.position();
						var _haveBeside = Window.sa.data.haveBeSide();
						if (_position == 1) {
							if (_haveBeside) {
								if (!hasValue(_widthFrontWay) && !hasValue(_widthValue)) {
									$('#widthFrontWay-widthValue-wrapper-error .help-block.sa-error').remove();
									$('#widthFrontWay-widthValue-wrapper-error').append('<span class="help-block sa-error">Vui lòng nhập ' + $('#widthFrontWay').data('label') + ' hoặc ' + $('#widthValue').data('label') + '</span>');
								}
							}
						} else {
							if (_position == 2) {
								if (_haveBeside) {
									if (!hasValue(_widthValue)) {
										$('#widthValue-alley-wrapper .form-group .col-md-12:last-child').append('<span class="help-block sa-error">Vui lòng nhập giá trị</span>');
									}
								}
							}
						}
					},
					deleteError: function () {
						var _widthFrontWay = Window.sa.data.widthFrontWay();
						var _widthValue = Window.sa.data.widthValue();
						var _position = Window.sa.data.position();
						var _haveBeside = Window.sa.data.haveBeSide();
						if (_position == 1) {
							if (_haveBeside) {
								if (hasValue(_widthFrontWay) || hasValue(_widthValue)) {
									$('#widthFrontWay-widthValue-wrapper-error .help-block.sa-error').remove();
									$('#widthFrontWay-widthValue-wrapper').removeClass('has-error');
								}
							}
						} else {
							if (_position == 2) {
								if (_haveBeside) {
									if (hasValue(_widthValue)) {
										$('#widthValue-alley + .help-block.sa-error').remove();
										$('#widthValue-alley-wrapper').removeClass('has-error');
									}
								}
							}
						}
					}
				}
			};
		}
	}

	function SAMarketReportValidation() {
		var _this = this;
		var houseForSaleSign = null;
		var landForSaleSign = null;
		var buildingHouseForSaleSign = null;
		var newPlanForSaleSign = null;
		var villaForSaleSign = null;
		var houseForRentSign = null;
		var buildingHouseForRentSign = null;
		var villaForRentSign = null;
		var villaForRentTMSign = null;
		var houseForRentTMSign = null;
		var buildingOfficeForRentSign = null;
		var landOfficeForRentSign = null;
		var roomForRentSign = null;

		_this.init = function () {
			initVAR();
			initSign();
		};

		function initSign() {
			houseForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 11);
			landForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 13);
			buildingHouseForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 8);
			newPlanForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 12);
			villaForSaleSign = (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 9);
			villaForRentSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 3);
			villaForRentTMSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 6);
			houseForRentSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 2);
			houseForRentTMSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 5);
			buildingHouseForRentSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 1);
			buildingOfficeForRentSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 4);
			landOfficeForRentSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 7);
			roomForRentSign = (Window.sa.data.listingTypeId() == 2 && Window.sa.data.propertyTypeId() == 10);
		}

		function initVAR() {
			_this.requiredFieldList = {
				'sourceId': {
					id: 'sourceId'
				},
				'propertyTypeId': {
					id: 'propertyTypeId'
				},
				'price': {
					id: 'price',
					type: {
						value: 'number',
						min: 0
					}
				},
				'address': {
					id: 'address'
				},
				'latitude': {
					id: 'latitude'
				},
				'longitude': {
					id: 'longitude'
				},
				'lotSize': {
					id: 'lotSize',
					rule: {
						validate: function () {
							var valid = true;
							if (houseForSaleSign || villaForSaleSign || houseForRentSign || houseForRentTMSign || villaForRentSign || villaForRentTMSign || landForSaleSign) {
								var lotSize = Window.sa.data.lotSize();
								valid = hasValue(lotSize) && lotSize > 0;
							}
							return valid;
						}
					}
				},
				'floorSize': {
					id: 'floorSize',
					rule: {
						validate: function () {
							var valid = true;
							if (houseForSaleSign || villaForSaleSign || houseForRentSign || houseForRentTMSign || villaForRentSign || villaForRentTMSign || buildingHouseForSaleSign || buildingHouseForRentSign || buildingOfficeForRentSign || newPlanForSaleSign || landOfficeForRentSign || roomForRentSign) {
								var floorSize = Window.sa.data.floorSize();
								valid = hasValue(floorSize) && floorSize > 0;
							}
							return valid;
						}
					}
				},
				'position': {
					id: 'position',
					rule: {
						validate: function () {
							var valid = true;
							if (houseForSaleSign || landForSaleSign || villaForSaleSign || houseForRentSign || houseForRentTMSign || villaForRentSign || villaForRentTMSign || roomForRentSign) {
								var position = Window.sa.data.position();
								valid = hasValue(position) && (position == 1 || position == 2);
							}
							return valid;
						}
					}
				},
				'houseTypeId': {
					id: 'houseTypeId',
					rule: {
						validate: function () {
							var valid = true;
							if (houseForSaleSign) {
								var houseTypeId = Window.sa.data.houseTypeId();
								valid = hasValue(houseTypeId);
							}
							return valid;
						}
					}
				},
				'constructionTypeId': {
					id: 'constructionTypeId',
					rule: {
						validate: function () {
							var valid = true;
							if (houseForSaleSign) {
								var constructionTypeId = Window.sa.data.constructionTypeId();
								var houseTypeId = Window.sa.data.houseTypeId();
								if (houseTypeId != 89) {
									valid = hasValue(constructionTypeId);
								}
							}
							return valid;
						}
					}
				},
				'depreciation': {
					id: 'depreciation',
					rule: {
						validate: function () {
							var valid = true;
							if (houseForSaleSign) {
								if (Window.sa.data.houseTypeId() != 89) {
									valid = hasValueV2(Window.sa.data.depreciation());
								}
							}
							return valid;
						}
					}
				}
			};
		}
	}

	function SAValidValidation() {
		var _this = this;

		_this.init = function () {
			initVAR();
		};

		function initVAR() {
			_this.requiredFieldList = {
				'sizeLength': {
					id: 'sizeLength',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					}
				},
				'sizeWidth': {
					id: 'sizeWidth',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					}
				},
				'lotSize': {
					id: 'lotSize',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					}
				},
				'bedRooms': {
					id: 'bedRooms',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					}
				},
				'floorSize': {
					id: 'floorSize',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					}
				},
				'bathRooms': {
					id: 'bathRooms',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					}
				},
				'buildingFloors': {
					id: 'buildingFloors',
					type: {
						value: 'number',
						min: -5,
						max: 100
					}
				},
				'depreciation': {
					id: 'depreciation',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					}
				},
				'roadFrontageWidth': {
					id: 'roadFrontageWidth',
					type: {
						value: 'number',
						min: 0,
						max: 999999999.99
					},
					rule: {
						validate: function () {
							var valid = true;
							var roadFrontageWidth = Window.sa.data.roadFrontageWidth();
							if (houseForSaleSign && Window.sa.data.position() == 1 && hasValue(roadFrontageWidth)) {
								valid = valid && (roadFrontageWidth > 0);
							}
							return valid;
						}
					},
					customErrorMessage: function () {
						return 'Vui lòng nhập giá trị.';
					}
				},
				'price': {
					id: 'price',
					type: {
						value: 'number',
						min: 0
					}
				},
				'roadPrice': {
					id: 'roadPrice',
					type: {
						value: 'number',
						min: 0
					}
				},
				'minPrice': {
					id: 'minPrice',
					type: {
						value: 'number',
						min: 0
					}
				}
			};
			_this.validate = function () {
				var fieldList = _this.requiredFieldList;
				var validAll = true;
				var fieldValue = null;
				var validField = true;
				var _message = '';
				var fieldLabel = '';
				clearAllErrors();
				for (var field in fieldList) {
					clearAllErrors(fieldList[field].id);
					if (hasValue(fieldList[field].fieldLabel)) {
						fieldLabel = fieldList[field].fieldLabel;
					} else {
						fieldLabel = $('#' + fieldList[field].id).data('label');
					}
					if (hasValue(fieldList[field].rule)) {
						validField = fieldList[field].rule.validate();
						if (!validField) {
							if (!hasValue(fieldList[field].customErrorMessage)) {
								_message = fieldLabel + ' Không hợp lệ.';
							} else {
								_message = fieldList[field].customErrorMessage();
							}
						}
					} else {
						fieldValue = Window.sa.data[fieldList[field].id]();
						if (hasValueV2(fieldValue)) {
							if (hasValue(fieldList[field].type)) {
								if (fieldList[field].type.value == 'number') {
									var validMin = true;
									var validMax = true;
									if (hasValueV2(fieldList[field].type.min)) {
										validMin = fieldValue >= fieldList[field].type.min;
										if (!validMin) {
											if (!hasValue(fieldList[field].customErrorMessage)) {
												_message = fieldLabel + ' phải >= ' + fieldList[field].type.min;
											} else {
												_message = fieldList[field].customErrorMessage();
											}
										}
									}
									if (hasValueV2(fieldList[field].type.max)) {
										validMax = fieldValue <= fieldList[field].type.max;
										if (!validMax) {
											if (!hasValue(fieldList[field].customErrorMessage)) {
												if (_message != '') {
													_message = _message + ' và <= ' + fieldList[field].type.max;
												} else {
													_message = fieldLabel + ' phải <= ' + fieldList[field].type.max;
												}
											} else {
												_message = fieldList[field].customErrorMessage();
											}
										}
									}
									validField = validMax && validMin;
								}
							}
						}
					}
					if (validField) {
						try {
							fieldList[field].deleteError();
						} catch (e) {
							$('label[for="' + fieldList[field].id + '"]').closest('.form-group').removeClass('has-error');
						}
					} else {
						try {
							fieldList[field].showError();
						} catch (e) {
							$('label[for="' + fieldList[field].id + '"]').closest('.form-group').addClass('has-error');
						}
						try {
							fieldList[field].errorMessage();
						} catch (e) {
							$('#' + fieldList[field].id + '-wrapper .form-group .col-md-12:last-child').append('<span class="help-block sa-error">' + _message + '</span>');
						}
					}
					validAll = validAll && validField;
				}
				return validAll;
			}
		}
	}
}

// class SAValidate {
// 	constructor() {
// 		this.list = [];
// 		this.typeValide = null;
// 		this.typeList = [
//
// 		];
// 	}
//
// }