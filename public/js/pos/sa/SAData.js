function SAData() {
    var _this = this;

    _this.init = function () {
        initVAR();
    };

    function isUndefined(value) {
        return (typeof value === undefined) || (value === undefined);
    }

    function isAgent() {
        var crawlerStatus = _this.crawlerStatus();
        return (crawlerStatus == 3);
    }

    function returnValue(fieldName, val) {
        if (val === undefined) {
            return Window.jsDetailData[fieldName]
        }
        if (val === '') {
            return Window.jsDetailData[fieldName] = ''
        }

        if (typeof val === 'string') {
            val = val.trim()
        }

        return Window.jsDetailData[fieldName] = val
    }

    function initVAR() {
        if (!hasValue(Window.jsDetailData.metaTag)) {
            Window.jsDetailData.metaTag = {
                title: null,
                description: null,
                keywords: null
            };
        } else {
            // no case
        }

        if (!hasValue(Window.jsDetailData.agent)) {
            Window.jsDetailData.agent = {
                info: {
                    agentId: null,
                    socialUid: -1,
                    name: null,
                    email: null,
                    phone: null,
                    note: null,
                    contractSigned: false,
                    contractStatus: 18
                }
            };
        } else {
            // no case
        }

        if (Window.jsDetailData.socialCommunications.length == 1) {
            if (Window.jsDetailData.socialCommunications[0].agentType != null) {
                Window.jsDetailData.socialCommunications.unshift({
                    "id": {
                        "socialUid": -1,
                        "rlistingId": Window.jsDetailData.rlistingId
                    },
                    "ownerId": null,
                    "email": null,
                    "name": null,
                    "telephone": null,
                    "phone": null,
                    "address": null,
                    "noteForPhone": null,
                    "phones": [],
                    "agentType": null
                });
            }
        } else {
            if (Window.jsDetailData.socialCommunications.length == 0) {
                Window.jsDetailData.socialCommunications.push({
                    "id": {
                        "socialUid": -1,
                        "rlistingId": Window.jsDetailData.rlistingId
                    },
                    "ownerId": null,
                    "email": null,
                    "name": null,
                    "telephone": null,
                    "phone": null,
                    "address": null,
                    "noteForPhone": null,
                    "phones": [],
                    "agentType": null
                });
            }
        }

        if (!hasValue(Window.jsDetailData.construction)) {
            Window.jsDetailData.construction = {
                id: {
                    houseTypeId: null,
                    constructionTypeId: null,
                    materialId: null
                },
                depreciation: null
            };
        }
        if (!hasValue(Window.jsDetailData.plan)) {
            Window.jsDetailData.plan = {
                rlistingId: Window.jsDetailData.rlistingId,
                type: null,
                area: null,
                note: null,
                photos: [],
                rightOfWay: null
            };
        }


        _this.isAgent = isAgent;

        _this.formId = function (formId) {
            if (!isUndefined(formId)) {
                if (!hasValue(formId)) {
                    formId = null;
                } else {
                    formId = parseInt(formId.replace(/,/g, ''));
                }
                Window.jsDetailData.formId = formId;
            } else {
                return hasValueV2(Window.jsDetailData.formId) ? Window.jsDetailData.formId : null;
            }
        };

        _this.realEstateGroupId = function (realEstateGroupId) {
            if (!isUndefined(realEstateGroupId)) {
                if (!hasValue(realEstateGroupId)) {
                    realEstateGroupId = null;
                } else {
                    realEstateGroupId = parseInt(realEstateGroupId.replace(/,/g, ''));
                }
                Window.jsDetailData.realEstateGroupId = realEstateGroupId;
            } else {
                return hasValueV2(Window.jsDetailData.realEstateGroupId) ? Window.jsDetailData.realEstateGroupId : null;
            }
        };

        _this.crawlerInfoLink = function (crawlerInfoLink) {
            if (!isUndefined(crawlerInfoLink)) {
                if (!hasValue(crawlerInfoLink)) {
                    crawlerInfoLink = null;
                } else {
                    crawlerInfoLink = crawlerInfoLink.trim();
                }

                Window.jsDetailData.crawlerInfo = $.extend(true, Window.jsDetailData.crawlerInfo, {
                    'link': crawlerInfoLink
                });
            } else {
                return hasValueV2(Window.jsDetailData.crawlerInfo) ? Window.jsDetailData.crawlerInfo.link : null;
            }
        };

        _this.listingTypeId = function (listingTypeId) {
            if (!isUndefined(listingTypeId)) {
                if (!hasValue(listingTypeId)) {
                    listingTypeId = null;
                } else {
                    listingTypeId = parseInt(listingTypeId.replace(/,/g, ''));
                }
                Window.jsDetailData.listingTypeId = listingTypeId;
            } else {
                return hasValueV2(Window.jsDetailData.listingTypeId) ? Window.jsDetailData.listingTypeId : '';
            }
        };

        _this.propertyTypeId = function (propertyTypeId) {
            if (!isUndefined(propertyTypeId)) {
                if (!hasValue(propertyTypeId)) {
                    propertyTypeId = null;
                } else {
                    propertyTypeId = parseInt(propertyTypeId.replace(/,/g, ''));
                }
                Window.jsDetailData.propertyTypeId = propertyTypeId;
            } else {
                return hasValueV2(Window.jsDetailData.propertyTypeId) ? Window.jsDetailData.propertyTypeId : '';
            }
        };

        _this.buildingId = function (buildingId) {
            if (!isUndefined(buildingId)) {
                buildingId = hasValue(buildingId) ? parseInt(buildingId) : null;
                Window.jsDetailData.buildingId = buildingId;
            } else {
                return hasValue(Window.jsDetailData) ? Window.jsDetailData.buildingId : null;
            }
        };

        _this.blockId = function (blockId) {
            if (!isUndefined(blockId)) {
                blockId = hasValue(blockId) ? parseInt(blockId) : null;
                Window.jsDetailData.blockId = blockId;
            } else {
                return hasValue(Window.jsDetailData.blockId) ? Window.jsDetailData.blockId : null;
            }
        };
        _this.modelCode = function (modelCode) {
            if (!isUndefined(modelCode)) {
                Window.jsDetailData.modelCode = hasValue(modelCode) ? $.trim(modelCode) : null;
            } else {
                return hasValue(Window.jsDetailData.modelCode) ? Window.jsDetailData.modelCode : '';
            }
        };


        _this.crawlerStatus = function (crawlerStatus) {
            if (!isUndefined(crawlerStatus)) {
                if (!hasValue(crawlerStatus)) {
                    crawlerStatus = null;
                } else {
                    crawlerStatus = parseInt(crawlerStatus.replace(/,/g, ''));
                }
                Window.jsDetailData.classify = crawlerStatus;
            } else {
                return hasValue(Window.jsDetailData.classify) ? Window.jsDetailData.classify : null;
            }
        };

        // _this.crawlerStatus = function (crawlerStatus) {
        // 	if (!isUndefined(crawlerStatus)) {
        // 		if (!hasValue(crawlerStatus)) {
        // 			crawlerStatus = null;
        // 		} else {
        // 			crawlerStatus = parseInt(crawlerStatus.replace(/,/g, ''));
        // 		}
        // 		Window.jsDetailData.crawlerInfo = $.extend(true, Window.jsDetailData.crawlerInfo, {
        // 			'status': crawlerStatus
        // 		});
        // 	} else {
        // 		return hasValue(Window.jsDetailData.crawlerInfo) ? Window.jsDetailData.crawlerInfo.status : null;
        // 	}
        // };

        _this.agent = function (agent) {
            if (!isUndefined(agent)) {
                if (!hasValue(agent)) {
                    agent = null;
                }
                Window.jsDetailData.agent = agent;
            } else {
                return hasValue(Window.jsDetailData.agent) ? Window.jsDetailData.agent : null;
            }
        };

        _this.socialCommunication = function (socialCommunication) {
            var socialCommunicationIndex = null;

            if (hasValue(Window.jsDetailData.socialCommunications)) {
                if (Window.jsDetailData.socialCommunications.length == 2) {
                    for (var i in Window.jsDetailData.socialCommunications) {
                        if (Window.jsDetailData.socialCommunications[i].agentType == null) {
                            socialCommunicationIndex = i;
                        }
                    }
                } else {
                    if (Window.jsDetailData.socialCommunications.length == 1) {
                        socialCommunicationIndex = 0;
                    }
                }
            }

            if (!isUndefined(socialCommunication)) {
                Window.jsDetailData.socialCommunications[socialCommunicationIndex] = socialCommunication;
            } else {
                return Window.jsDetailData.socialCommunications[socialCommunicationIndex];
            }
        };

        _this.socialUid = function (socialUid) {
            if (!isUndefined(socialUid)) {
                if (!hasValue(socialUid)) {
                    socialUid = null;
                }
                Window.jsDetailData.socialUid = socialUid;
            } else {
                return hasValue(Window.jsDetailData.socialUid) ? Window.jsDetailData.socialUid : null;
            }
        };

        _this.socialCommunications = function (socialCommunications) {
            if (!isUndefined(socialCommunications)) {
                if (!hasValue(socialCommunications)) {
                    socialCommunications = null;
                } else {
                    // no case
                }
                Window.jsDetailData.socialCommunications = socialCommunications;
            } else {
                return hasValueV2(Window.jsDetailData.socialCommunications) ? Window.jsDetailData.socialCommunications : null;
            }
        };

        _this.statusId = function (statusId) {
            if (!isUndefined(statusId)) {
                if (!hasValue(statusId)) {
                    statusId = null;
                } else {
                    statusId = parseInt(statusId.replace(/,/g, ''));
                }
                Window.jsDetailData.status.statusId = status.statusId;
            } else {
                return hasValueV2(Window.jsDetailData.status) ? Window.jsDetailData.status.statusId : null;
            }
        };

        _this.customerServiceRequest = function (customerServiceRequest) {
            if (!isUndefined(customerServiceRequest)) {
                if (!hasValue(customerServiceRequest)) {
                    customerServiceRequest = null;
                } else {

                }

            } else {
                return hasValueV2(Window.jsDetailData.customerServiceRequest) ? Window.jsDetailData.customerServiceRequest : 'N/A';
            }
        };
        _this.mockSurnameId = function (mockSurnameId) {
            if (!isUndefined(mockSurnameId)) {
                Window.jsDetailData.mockSurnameId = mockSurnameId ? mockSurnameId : null;
            } else {
                return Window.jsDetailData.mockSurnameId ? Window.jsDetailData.mockSurnameId : '';
            }
        };

        _this.name = function (name) {
            let getName = null
            if (!isUndefined(name)) {
                if (!hasValue(name)) {
                    name = null;
                } else {
                    name = name.trim();
                }

                getItemOfSocialOwner(Window.jsDetailData.socialCommunications, function (re) {
                    getName = $.extend(Window.jsDetailData.socialCommunications[re.index], {'name': name});
                })
            } else {
                getItemOfSocialOwner(Window.jsDetailData.socialCommunications, function (re) {
                    getName = re.item.name;
                });
            }
            
            return getName;
        };

        _this.phone = function (phone) {
            if (!isUndefined(phone)) {
                phone = hasValue(phone) ? phone.trim() : null;
                getItemOfSocialOwner(Window.jsDetailData.socialCommunications, function (re) {
                    $.extend(Window.jsDetailData.socialCommunications[re.index], {'phone': phone});
                })
            } else {
                var phone = null;
                getItemOfSocialOwner(Window.jsDetailData.socialCommunications, function (re) {
                    phone = re.item.phone;
                });
                return phone;
            }
        };

        _this.phoneAgent = function () {
            var phone = null;
            // getItemOfSocialAgent(Window.jsDetailData.socialCommunications, function (re) {
            // 	phone = re.item.phone;
            // })
            phone = _this.agent().info.phone;
            return phone;
        };

        _this.noteForPhone = function (noteForPhone) {
            if (!isUndefined(noteForPhone)) {
                noteForPhone = hasValue(noteForPhone) ? noteForPhone : null;
                getItemOfSocialOwner(Window.jsDetailData.socialCommunications, function (re) {
                    re.item.noteForPhone = noteForPhone;
                })
            } else {
                var noteForPhone = null;
                getItemOfSocialOwner(Window.jsDetailData.socialCommunications, function (re) {
                    noteForPhone = re.item.noteForPhone;
                })
                return noteForPhone;
            }
        };

        _this.phones = function (phones) {
            var social = Window.jsDetailData.socialCommunications;
            if (!isUndefined(phones)) {
                phones = hasValue(phones) ? phones : [];
                getItemOfSocialOwner(social, function (re) {
                    Window.jsDetailData.socialCommunications[re.index].phones = phones;
                })
            } else {
                var phones = [];
                getItemOfSocialOwner(social, function (re) {
                    phones = re.item.phones;
                });
                return phones;
            }
        };

        _this.ownerPhones = function (phones) {
            if (!isUndefined(phones)) {
                phones = hasValue(phones) ? phones : [];
                Window.jsDetailData.ownerPhones = phones;
            } else {
                return Window.jsDetailData.ownerPhones;
            }
        };

        _this.noteForPhoneAgent = function () {
            var noteForPhone = null;
            // getItemOfSocialAgent(Window.jsDetailData.socialCommunications, function (re) {
            // 	noteForPhone = re.item.noteForPhone;
            // });
            noteForPhone = _this.agent().info.note;
            return noteForPhone;
        };

        _this.email = function (email) {
            if (!isUndefined(email)) {
                email = hasValue(email) ? email.trim() : null;
                email = hasValue(email) ? email.toLowerCase() : null;
                getItemOfSocialOwner(Window.jsDetailData.socialCommunications, function (re) {
                    $.extend(Window.jsDetailData.socialCommunications[re.index], {'email': email});
                })
            } else {
                var email = null;
                getItemOfSocialOwner(Window.jsDetailData.socialCommunications, function (re) {
                    email = re.item.email;
                });
                email = hasValue(email) ? email.toLowerCase() : null;
                return email;
            }
        };

        _this.address = function (address) {
            return returnValue('address', address)
        };
        _this.addressNote = function (addressNote) {
            if (!isUndefined(addressNote)) {
                Window.jsDetailData.addressNote = hasValue(addressNote) ? addressNote.trim() : null;
            } else {
                return Window.jsDetailData.addressNote;
            }
        };

        _this.agentId = function (agentId) {
            if (!isUndefined(agentId)) {
                if (!hasValue(agentId)) {
                    agentId = null;
                } else {
                    agentId = parseInt(agentId.trim());
                }
                Window.jsDetailData.agent.info.agentId = agentId;
            } else {
                return Window.jsDetailData.agent.info.agentId;
            }
        };

        _this.socialUid = function (socialUid) {
            if (!isUndefined(socialUid)) {
                if (!hasValue(socialUid)) {
                    socialUid = null;
                }
                Window.jsDetailData.agent.info.socialUid = socialUid;
            } else {
                return hasValue(Window.jsDetailData.agent.info.socialUid) ? Window.jsDetailData.agent.info.socialUid : null;
            }
        };

        _this.isOwner = function (data) {
            if (!isUndefined(data)) {
                Window.jsDetailData.isOwner = !hasValue(data) ? false : true;
            } else {
                return hasValue(Window.jsDetailData.isOwner) ? Window.jsDetailData.isOwner : null;
            }
        };
        _this.useDefaultPhoto = function (useDefaultPhoto) {
            if (!isUndefined(useDefaultPhoto)) {
                Window.jsDetailData.useDefaultPhoto = !!useDefaultPhoto;
            } else {
                return hasValueV2(Window.jsDetailData.useDefaultPhoto) ? Window.jsDetailData.useDefaultPhoto : null;
            }
        };

        _this.agentName = function () {
            return _this.agent().info.name;
        };

        _this.agentEmail = function () {
            return _this.agent().info.email ? _this.agent().info.email : "";
        };

        _this.agentContractSignedText = function () {
            return (_this.agent().info.contractSigned == true ? 'Đã ký HĐ' : 'Chưa ký HĐ');
        };

        _this.agentContractSigned = function () {
            return _this.agent().info.contractSigned;
        };

        _this.agentContractStatusText = function () {
            return (_this.agent().info.contractStatus == 17 ? 'Đã ký HĐ' : 'Chưa ký HĐ');
        };

        _this.agentContractStatus = function () {
            return _this.agent().info.contractStatus;
        };

        _this.agentPhone = function () {
            return _this.agent().info.phone;
        };

        _this.noteSA = function (noteSA) {
            if (!isUndefined(noteSA)) {
                if (!hasValue(noteSA)) {
                    noteSA = null;
                } else {
                    noteSA = noteSA.trim();
                }
                Window.jsDetailData.note = noteSA;
            } else {
                return (hasValue(Window.jsDetailData.note) ? Window.jsDetailData.note : null);
            }
        };

        _this.noteCRM = function (noteCRM) {
            if (!isUndefined(noteCRM)) {
                if (!hasValue(noteCRM)) {
                    noteCRM = null;
                } else {
                    noteCRM = noteCRM.trim();
                }
                Window.jsDetailData.noteCRM = noteCRM;
            } else {
                return (hasValue(Window.jsDetailData.noteCRM) ? Window.jsDetailData.noteCRM : null);
            }
        };

        _this.oldAddress = function (oldAddress) {
            if (!isUndefined(oldAddress)) {
                if (!hasValue(oldAddress)) {
                    oldAddress = null;
                } else {
                    oldAddress = oldAddress.trim();
                }
                Window.jsDetailData.oldAddress = oldAddress;
            } else {
                return hasValueV2(Window.jsDetailData.oldAddress) ? Window.jsDetailData.oldAddress : null;
            }
        };

        _this.shortAddress = function (shortAddress) {
            if (!isUndefined(shortAddress)) {
                if (!hasValue(shortAddress)) {
                    shortAddress = null;
                } else {
                    shortAddress = shortAddress.trim();
                }
                Window.jsDetailData.shortAddress = shortAddress;
            } else {
                return hasValueV2(Window.jsDetailData.shortAddress) ? Window.jsDetailData.shortAddress : null;
            }
        };

        _this.longitude = function (longitude) {
            return returnValue('longitude', longitude)
        };

        _this.latitude = function (latitude) {
            return returnValue('latitude', latitude)
        };

        _this.houseTypeId = function (houseTypeId) {
            if (!isUndefined(houseTypeId)) {
                if (!hasValue(houseTypeId)) {
                    houseTypeId = null;
                } else {
                    houseTypeId = parseInt(houseTypeId.replace(/,/g, ''));
                }
                Window.jsDetailData.construction.id.houseTypeId = houseTypeId;
            } else {
                return hasValue(Window.jsDetailData.construction) && hasValue(Window.jsDetailData.construction.id) ? (hasValue(Window.jsDetailData.construction.id.houseTypeId) ? Window.jsDetailData.construction.id.houseTypeId : null) : null;
            }
        };

        _this.depreciation = function (depreciation) {
            if (!isUndefined(depreciation)) {
                if (!hasValue(depreciation)) {
                    depreciation = null;
                } else {
                    depreciation = parseFloat(depreciation);
                }
                Window.jsDetailData.construction.depreciation = depreciation;
            } else {
                return hasValueV2(Window.jsDetailData.construction) ? Window.jsDetailData.construction.depreciation : null;
            }
        };

        _this.constructionTypeId = function (constructionTypeId) {
            if (!isUndefined(constructionTypeId)) {
                if (!hasValue(constructionTypeId)) {
                    constructionTypeId = 0;
                }
                Window.jsDetailData.construction.id.constructionTypeId = constructionTypeId;
            } else {
                return hasValue(Window.jsDetailData.construction) && hasValue(Window.jsDetailData.construction.id) ? (hasValue(Window.jsDetailData.construction.id.constructionTypeId) ? Window.jsDetailData.construction.id.constructionTypeId : null) : null;
            }
        };

        _this.currency = function (currency) {
            return returnValue('currency', currency)
        };

        _this.price = function (price) {
            if (!isUndefined(price)) {
                if (!hasValue(price)) {
                    price = null;
                } else {
                    price = parseFloat(price.replace(/,/g, ''));
                }
                Window.jsDetailData.price = price;
            } else {
                return hasValueV2(Window.jsDetailData.price) ? Window.jsDetailData.price : null;
            }
        };

        _this.minPrice = function (minPrice) {
            if (!isUndefined(minPrice)) {
                if (!hasValue(minPrice)) {
                    minPrice = null;
                } else {
                    minPrice = parseFloat(minPrice.replace(/,/g, ''));
                }
                Window.jsDetailData.minPrice = minPrice;
            } else {
                return hasValueV2(Window.jsDetailData.minPrice) ? Window.jsDetailData.minPrice : null;
            }
        };

        _this.crawlerInfoNote = function (crawlerInfoNote) {
            if (!isUndefined(crawlerInfoNote)) {
                if (!hasValue(crawlerInfoNote)) {
                    crawlerInfoNote = null;
                } else {
                    crawlerInfoNote = crawlerInfoNote.trim();
                }

                $.extend(Window.jsDetailData.crawlerInfo, {
                    'note': crawlerInfoNote
                });
            } else {
                return hasValue(Window.jsDetailData.crawlerInfo) ? Window.jsDetailData.crawlerInfo.note : null;
            }
        };
        _this.prescreenerNote = function (prescreenerNote) {
            if (!isUndefined(prescreenerNote)) {
                if (!hasValue(prescreenerNote)) {
                    prescreenerNote = null;
                } else {
                    prescreenerNote = prescreenerNote.trim();
                }

                Window.jsDetailData.crawlerInfo = $.extend(true, Window.jsDetailData.crawlerInfo, {
                    lsoNote: prescreenerNote
                });
            } else {
                return hasValue(Window.jsDetailData.crawlerInfo) ? Window.jsDetailData.crawlerInfo.lsoNote : null;
            }
        };

        _this.sourceName = function (sourceName) {
            if (!isUndefined(sourceName)) {
                if (!hasValue(sourceName)) {
                    sourceName = null;
                } else {
                    sourceName = sourceName.trim();
                }
                Window.jsDetailData.sourceName = sourceName;
            } else {
                return hasValueV2(Window.jsDetailData.sourceName) ? Window.jsDetailData.sourceName : null;
            }
        };

        _this.sourceId = function (sourceId) {
            if (!isUndefined(sourceId)) {
                if (!hasValue(sourceId)) {
                    sourceId = null;
                } else {
                    sourceId = sourceId.trim();
                }
                Window.jsDetailData.sourceId = sourceId;
            } else {
                return hasValueV2(Window.jsDetailData.sourceId) ? Window.jsDetailData.sourceId : null;
            }
        };

        _this.channelTypeId = function (data) {
            if (!isUndefined(data)) {
                if (!hasValue(data)) {
                    data = null;
                } else {
                    data = data.trim();
                }
                Window.jsDetailData.channelTypeId = data;
            } else {
                return hasValueV2(Window.jsDetailData.channelTypeId) ? Window.jsDetailData.channelTypeId : null;
            }
        };

        _this.channelTypeChildId = function (data) {
            if (!isUndefined(data)) {
                if (!hasValue(data)) {
                    data = null;
                } else {
                    data = data.trim();
                }
                Window.jsDetailData.channelTypeChildId = data;
            } else {
                return hasValueV2(Window.jsDetailData.channelTypeChildId) ? Window.jsDetailData.channelTypeChildId : null;
            }
        };


        _this.commissionText = function () {
            return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.commissionText : null;
        };

        _this.commissionFrom = function (commissionFrom) {
            if (!isUndefined(commissionFrom)) {
                if (!hasValue(commissionFrom)) {
                    commissionFrom = null;
                } else {
                    commissionFrom = parseFloat(commissionFrom.replace(/,/g, ''));
                }
                Window.jsDetailData.commissionFrom = commissionFrom;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.commissionFrom : null;
            }
        };

        _this.commissionTo = function (commissionTo) {
            if (!isUndefined(commissionTo)) {
                if (!hasValue(commissionTo)) {
                    commissionTo = null;
                } else {
                    commissionTo = parseFloat(commissionTo.replace(/,/g, ''));
                }
                Window.jsDetailData.commissionTo = commissionTo;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.commissionTo : null;
            }
        };

        _this.commissionPrice = function (commissionPrice) {
            if (!isUndefined(commissionPrice)) {
                if (!hasValue(commissionPrice)) {
                    commissionPrice = null;
                } else {
                    commissionPrice = parseFloat(commissionPrice.replace(/,/g, ''));
                }
                Window.jsDetailData.commissionPrice = commissionPrice;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.commissionPrice : null;
            }
        };

        _this.commissionList = function (commissionList) {
            if (!isUndefined(commissionList)) {
                if (!hasValue(commissionList)) {
                    commissionList = [];
                }
                for (var i in commissionList) {
                    if (hasValue(commissionList[i].commision)) {
                        commissionList[i].commision = parseFloat(commissionList[i].commision.replace(/,/g, ''));
                    } else {
                        commissionList[i].commision = null;
                    }
                    if (hasValue(commissionList[i].contractTime)) {
                        commissionList[i].contractTime = parseInt(commissionList[i].contractTime);
                    } else {
                        commissionList[i].contractTime = null;
                    }
                    if (hasValue(commissionList[i].isPercentage)) {
                        commissionList[i].isPercentage = true;
                    } else {
                        commissionList[i].isPercentage = false;
                    }
                }
                Window.jsDetailData.commissionList = commissionList;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.commissionList : [];
            }
        };

        _this.yearBuilt = function (yearBuilt) {
            if (!isUndefined(yearBuilt)) {
                if (!hasValue(yearBuilt)) {
                    yearBuilt = null;
                } else {
                    yearBuilt = parseInt(yearBuilt.replace(/,/g, ''));
                }
                Window.jsDetailData.yearBuilt = yearBuilt;
            } else {
                return hasValueV2(Window.jsDetailData.yearBuilt) ? Window.jsDetailData.yearBuilt : null;
            }
        };

        _this.yearFixed = function (yearFixed) {
            if (!isUndefined(yearFixed)) {
                if (!hasValue(yearFixed)) {
                    yearFixed = null;
                } else {
                    yearFixed = parseInt(yearFixed.replace(/,/g, ''));
                }
                Window.jsDetailData.yearFixed = yearFixed;
            } else {
                return hasValue(Window.jsDetailData.yearFixed) ? Window.jsDetailData.yearFixed : null;
            }
        };

        _this.numberFloor = function (numberFloor) {
            return returnValue('numberFloor', numberFloor)
        };

        _this.isMezzanine = function (isMezzanine) {
            if (!isUndefined(isMezzanine)) {
                if (hasValue(isMezzanine)) {
                    isMezzanine = true;
                } else {
                    isMezzanine = false;
                }
                Window.jsDetailData.isMezzanine = isMezzanine;
            } else {
                return hasValueV2(Window.jsDetailData.isMezzanine) ? Window.jsDetailData.isMezzanine : null;
            }
        };

        _this.isRooftop = function (isRooftop) {
            if (!isUndefined(isRooftop)) {
                if (hasValue(isRooftop)) {
                    isRooftop = true;
                } else {
                    isRooftop = false;
                }
                Window.jsDetailData.isRooftop = isRooftop;
            } else {
                return hasValueV2(Window.jsDetailData.isRooftop) ? Window.jsDetailData.isRooftop : null;
            }
        };

        _this.isBasement = function (isBasement) {
            if (!isUndefined(isBasement)) {
                if (hasValue(isBasement)) {
                    isBasement = 1;
                } else {
                    isBasement = 0;
                }
                Window.jsDetailData.facility.numberBasement = isBasement;
            } else {
                return hasValueV2(Window.jsDetailData.facility.numberBasement) ? Window.jsDetailData.facility.numberBasement : null;
            }
        };

        _this.isPenhouse = function (isPenhouse) {
            if (!isUndefined(isPenhouse)) {
                if (hasValue(isPenhouse)) {
                    isPenhouse = true;
                } else {
                    isPenhouse = false;
                }
                Window.jsDetailData.isPenhouse = isPenhouse;
            } else {
                return hasValueV2(Window.jsDetailData.isPenhouse) ? Window.jsDetailData.isPenhouse : null;
            }
        };

        _this.isAttic = function (isAttic) {
            if (!isUndefined(isAttic)) {
                if (hasValue(isAttic)) {
                    isAttic = true;
                } else {
                    isAttic = false;
                }
                Window.jsDetailData.isAttic = isAttic;
            } else {
                return hasValueV2(Window.jsDetailData.isAttic) ? Window.jsDetailData.isAttic : null;
            }
        };

        _this.bedRooms = function (bedRooms) {
            if (!isUndefined(bedRooms)) {
                if (!hasValue(bedRooms)) {
                    bedRooms = null;
                } else {
                    bedRooms = parseInt(bedRooms.replace(/,/g, ''));
                }
                Window.jsDetailData.bedRooms = bedRooms;
            } else {
                return hasValueV2(Window.jsDetailData.bedRooms) ? Window.jsDetailData.bedRooms : null;
            }
        };

        _this.bathRooms = function (bathRooms) {
            if (!isUndefined(bathRooms)) {
                if (!hasValue(bathRooms)) {
                    bathRooms = null;
                } else {
                    bathRooms = parseInt(bathRooms.replace(/,/g, ''));
                }
                Window.jsDetailData.bathRooms = bathRooms;
            } else {
                return hasValueV2(Window.jsDetailData.bathRooms) ? Window.jsDetailData.bathRooms : null;
            }
        };

        _this.houseCastings = function (houseCastings) {
            if (!isUndefined(houseCastings)) {
                if (!hasValue(houseCastings)) {
                    houseCastings = null;
                } else {
                    houseCastings = parseInt(houseCastings.replace(/,/g, ''));
                }
                Window.jsDetailData.houseCastings = houseCastings;
            } else {
                return hasValueV2(Window.jsDetailData.houseCastings) ? Window.jsDetailData.houseCastings : null;
            }
        };

        _this.roadPrice = function (roadPrice) {
            if (!isUndefined(roadPrice)) {
                if (!hasValue(roadPrice)) {
                    roadPrice = null;
                } else {
                    roadPrice = parseInt(roadPrice.replace(/,/g, ''));
                }
                Window.jsDetailData.roadPrice = roadPrice;
            } else {
                return hasValueV2(Window.jsDetailData.roadPrice) ? Window.jsDetailData.roadPrice : null;
            }
        };

        // số lầu trong trường hợp không phải là buiding hoặc vị trí lầu trong trường hợp là building
        _this.buildingFloors = function (buildingFloors) {
            if (!isUndefined(buildingFloors)) {
                buildingFloors = isVal(buildingFloors) ? buildingFloors : null;
                Window.jsDetailData.floors = buildingFloors;
            } else {
                return isVal(Window.jsDetailData.floors) ? Window.jsDetailData.floors : null;
            }
        };

        _this.position = function (position) {
            if (!isUndefined(position)) {
                if (!hasValue(position)) {
                    position = null;
                } else {
                    position = parseInt(position.replace(/,/g, ''));
                }
                if (!hasValue(Window.jsDetailData.position)) {
                    Window.jsDetailData.position = {};
                }
                Window.jsDetailData.position.position = position;
            } else {
                return hasValueV2(Window.jsDetailData.position) ? Window.jsDetailData.position.position : null;
            }
        };

        _this.valuationType = function (valuationType) {
            if (!isUndefined(valuationType)) {
                if (!hasValue(valuationType)) {
                    valuationType = null;
                } else {
                    valuationType = valuationType.trim();
                }
                Window.jsDetailData.valuationType = valuationType;
            } else {
                return hasValueV2(Window.jsDetailData.valuationType) ? Window.jsDetailData.valuationType : null;
            }
        };

        _this.valuationPriceFormat = function () {
            return hasValueV2(Window.jsDetailData.valuationPriceFormat) ? Window.jsDetailData.valuationPriceFormat : null;
        };

        _this.valuationPrice = function (valuationPrice) {
            if (!isUndefined(valuationPrice)) {
                if (!hasValue(valuationPrice)) {
                    valuationPrice = null;
                } else {

                }
                Window.jsDetailData.valuationPrice = valuationPrice;
            } else {
                return hasValueV2(Window.jsDetailData.valuationPrice) ? Window.jsDetailData.valuationPrice : null;
            }
        };

        _this.roadFrontageWidth = function (roadFrontageWidth) {
            if (roadFrontageWidth) {
                return Window.jsDetailData.position.roadFrontageWidth = parseFloat(roadFrontageWidth)
            }

            return Window.jsDetailData.position && parseFloat(Window.jsDetailData.position.roadFrontageWidth) || ''
        };

        _this.widthValue = function (widthValue) {
            if (widthValue || widthValue === '') {
                if (Window.jsDetailData.position) {
                    return Window.jsDetailData.position.widthValue = parseFloat(widthValue)
                }

                return widthValue
            }

            return Window.jsDetailData.position && parseFloat(Window.jsDetailData.position.widthValue) || ''
        };

        _this.widthFrontWay = function (widthFrontWay) {
            if (widthFrontWay || widthFrontWay === '') {
                if (Window.jsDetailData.position) {
                    return Window.jsDetailData.position.widthFrontWay = parseFloat(widthFrontWay)
                }
                return widthFrontWay
            }

            return Window.jsDetailData.position && parseFloat(Window.jsDetailData.position.widthFrontWay) || ''
        };

        _this.haveBeSide = function (haveBeSide) {
            if (!isUndefined(haveBeSide)) {
                if (hasValue(haveBeSide)) {
                    haveBeSide = true;
                } else {
                    haveBeSide = false;
                }
                if (!hasValue(Window.jsDetailData.position)) {
                    Window.jsDetailData.position = {};
                }
                Window.jsDetailData.position.haveBeSide = haveBeSide;
            } else {
                return hasValueV2(Window.jsDetailData.position) ? Window.jsDetailData.position.haveBeSide : null;
            }
        };

        _this.alleyType = function (alleyType) {
            if (alleyType) {
                return Window.jsDetailData.position.alleyType = alleyType
            }

            return Window.jsDetailData.position && Window.jsDetailData.position.alleyType || ''
        };

        _this.alleyId = function (alleyId) {
            if (alleyId) {
                return Window.jsDetailData.position.alleyId = alleyId
            }

            return Window.jsDetailData.position && Window.jsDetailData.position.alleyId || ''
        };

        _this.alleyWidth = function (alleyWidth) {
            if (alleyWidth) {
                return Window.jsDetailData.position.alleyWidth = alleyWidth
            }

            return Window.jsDetailData.position && Window.jsDetailData.position.alleyWidth || ''
        };

        _this.roadFrontageDistance = function (roadFrontageDistance) {
            if (roadFrontageDistance || roadFrontageDistance === '1') {
                let data = roadFrontageDistance
                if (typeof roadFrontageDistance === 'string') {
                    data = parseInt(roadFrontageDistance.replace(/,/g, ''));
                }

                var roadFrontageDistanceFrom = null;
                var roadFrontageDistanceTo = null;
                if (data === 1) {
                    roadFrontageDistanceFrom = 0;
                    roadFrontageDistanceTo = 100;
                } else if (data === 100) {
                    roadFrontageDistanceFrom = 100;
                    roadFrontageDistanceTo = 200;
                } else if (data === 200) {
                    roadFrontageDistanceFrom = 200;
                    roadFrontageDistanceTo = 500;
                } else if (data === 500) {
                    roadFrontageDistanceFrom = 500;
                }
                Window.jsDetailData.roadFrontageDistanceFrom = roadFrontageDistanceFrom;
                Window.jsDetailData.roadFrontageDistanceTo = roadFrontageDistanceTo;
            } else {
                if (Window.jsDetailData.roadFrontageDistanceFrom === 0) {
                    return 1
                }
                return Window.jsDetailData.roadFrontageDistanceFrom
            }
        };

        _this.statusQuoId = function (statusQuoId) {
            if (!isUndefined(statusQuoId)) {
                if (!hasValue(statusQuoId)) {
                    statusQuoId = null;
                }
                Window.jsDetailData.statusQuoId = statusQuoId;
            } else {
                return hasValueV2(Window.jsDetailData.statusQuoId) ? Window.jsDetailData.statusQuoId : null;
            }
        };

        _this.priceForStatusQuo = function (priceForStatusQuo) {
            if (!isUndefined(priceForStatusQuo)) {
                if (!hasValue(priceForStatusQuo)) {
                    priceForStatusQuo = null;
                } else {
                    priceForStatusQuo = parseInt(priceForStatusQuo.replace(/,/g, ''));
                }
                Window.jsDetailData.priceForStatusQuo = priceForStatusQuo;
            } else {
                return hasValueV2(Window.jsDetailData.priceForStatusQuo) ? Window.jsDetailData.priceForStatusQuo : null;
            }
        };

        _this.useRightTypeId = function (useRightTypeId) {
            if (!isUndefined(useRightTypeId)) {
                if (!hasValue(useRightTypeId)) {
                    useRightTypeId = null;
                } else {
                    useRightTypeId = parseInt(useRightTypeId.replace(/,/g, ''));
                }
                Window.jsDetailData.useRightTypeId = useRightTypeId;
            } else {
                return hasValueV2(Window.jsDetailData.useRightTypeId) ? Window.jsDetailData.useRightTypeId : null;
            }
        };

        _this.afterSigningContract = function (afterSigningContract) {
            if (!isUndefined(afterSigningContract)) {
                if (hasValue(afterSigningContract)) {
                    afterSigningContract = true;
                } else {
                    afterSigningContract = false;
                }
                Window.jsDetailData.rlMoveInDate = $.extend(true, Window.jsDetailData.rlMoveInDate, {
                    'afterSigningContract': afterSigningContract
                });

                return afterSigningContract
            } else {
                if (hasValueV2(Window.jsDetailData.rlMoveInDate)) {
                    return Window.jsDetailData.rlMoveInDate.afterSigningContract ? Window.jsDetailData.rlMoveInDate.afterSigningContract : false;
                } else {
                    Window.jsDetailData.rlMoveInDate = $.extend(true, Window.jsDetailData.rlMoveInDate, {
                        'afterSigningContract': false,
                        'moveInDate': null
                    });
                    return false;
                }

            }
        };

        _this.houseShape = function (houseShape) {
            return returnValue('houseShape', houseShape)
        };

        _this.otherHouseShape = function (otherHouseShape) {
            return returnValue('otherHouseShape', otherHouseShape)
        };

        _this.landCode = function (data) {
            if (!isUndefined(data)) {
                if (!hasValue(data)) {
                    data = null;
                } else {
                    data = parseInt(data.replace(/,/g, ''));
                }
                Window.jsDetailData.landCode = data;
            } else {
                return hasValueV2(Window.jsDetailData.landCode) ? Window.jsDetailData.landCode : null;
            }
        };

        _this.mapCode = function (data) {
            if (!isUndefined(data)) {
                if (!hasValue(data)) {
                    data = null;
                } else {
                    data = parseInt(data.replace(/,/g, ''));
                }
                Window.jsDetailData.mapCode = data;
            } else {
                return hasValueV2(Window.jsDetailData.mapCode) ? Window.jsDetailData.mapCode : null;
            }
        };

        _this.mapYear = function (data) {
            if (!isUndefined(data)) {
                if (!hasValue(data)) {
                    data = null;
                } else {
                    data = parseInt(data.replace(/,/g, ''));
                }
                Window.jsDetailData.mapYear = data;
            } else {
                return hasValueV2(Window.jsDetailData.mapYear) ? Window.jsDetailData.mapYear : null;
            }
        };

        _this.rlistingId = function () {
            return Window.jsDetailData.rlistingId;
        };

        _this.moveInDate = function (moveInDate) {
            if (moveInDate) {
                moveInDate = parseInt(moment(moveInDate, 'DD/MM/YYYY').unix() * 1000);
                Window.jsDetailData.rlMoveInDate = $.extend(true, Window.jsDetailData.rlMoveInDate, {
                    moveInDate
                });
                return

            } else {
                if (Window.jsDetailData.rlMoveInDate) {
                    return hasValueV2(Window.jsDetailData.rlMoveInDate.moveInDate) ? moment(Window.jsDetailData.rlMoveInDate.moveInDate).format('DD/MM/YYYY') : '';
                } else {
                    Window.jsDetailData.rlMoveInDate = $.extend(true, Window.jsDetailData.rlMoveInDate, {
                        'afterSigningContract': false,
                        'moveInDate': null
                    });
                    return '';
                }
            }
        };

        _this.guaranteedExpiredDate = function (guaranteedExpiredDate) {
            if (!isUndefined(guaranteedExpiredDate)) {
                if (!hasValue(guaranteedExpiredDate)) {
                    guaranteedExpiredDate = null;
                } else {
                    guaranteedExpiredDate = parseInt(moment(guaranteedExpiredDate, 'DD/MM/YYYY').unix() * 1000);
                }
                Window.jsDetailData.guaranteedExpiredDate = guaranteedExpiredDate;
                // $.extend(Window.jsDetailData.guaranteedExpiredDate, {
                // 	'guaranteedExpiredDate': guaranteedExpiredDate
                // });
            } else {
                if (Window.jsDetailData.guaranteedExpiredDate) {
                    return hasValueV2(Window.jsDetailData.guaranteedExpiredDate) ? moment(Window.jsDetailData.guaranteedExpiredDate).format('DD/MM/YYYY') : '';
                } else {
                    return '';
                }

            }
        };
        _this.guaranteedSignedDate = function (guaranteedSignedDate) {
            if (!isUndefined(guaranteedSignedDate)) {
                if (!hasValue(guaranteedSignedDate)) {
                    guaranteedSignedDate = null;
                } else {
                    guaranteedSignedDate = parseInt(moment(guaranteedSignedDate, 'DD/MM/YYYY').unix() * 1000);
                }
                Window.jsDetailData.guaranteedSignedDate = guaranteedSignedDate;
                // $.extend(Window.jsDetailData.guaranteedExpiredDate, {
                // 	'guaranteedExpiredDate': guaranteedExpiredDate
                // });
            } else {
                if (Window.jsDetailData.guaranteedSignedDate) {
                    return hasValueV2(Window.jsDetailData.guaranteedSignedDate) ? moment(Window.jsDetailData.guaranteedSignedDate).format('DD/MM/YYYY') : '';
                } else {
                    return '';
                }

            }
        };

        _this.minContractDeadline = function (minContractDeadline) {
            if (!isUndefined(minContractDeadline)) {
                if (!hasValue(minContractDeadline)) {
                    minContractDeadline = null;
                } else {
                    minContractDeadline = minContractDeadline.replace(/,/g, '').trim();
                }
                Window.jsDetailData.minContractDeadline = minContractDeadline;
            } else {
                return hasValueV2(Window.jsDetailData.minContractDeadline) ? Window.jsDetailData.minContractDeadline : null;
            }
        };

        _this.deposit = function (deposit) {
            if (!isUndefined(deposit)) {
                if (!hasValue(deposit)) {
                    deposit = null;
                } else {
                    deposit = parseFloat(deposit.replace(/,/g, ''));
                }
                Window.jsDetailData.deposit = deposit;
            } else {
                return hasValueV2(Window.jsDetailData.deposit) ? Window.jsDetailData.deposit : null;
            }
        };

        _this.depositText = function (depositText) {
            if (!isUndefined(depositText)) {
                if (!hasValue(depositText)) {
                    depositText = null;
                } else {
                    depositText = parseFloat(depositText.replace(/,/g, ''));
                }
                Window.jsDetailData.depositText = depositText;
            } else {
                return hasValueV2(Window.jsDetailData.depositText) ? Window.jsDetailData.depositText : null;
            }
        };

        _this.useDiy = function (useDiy) {
            if (!isUndefined(useDiy)) {
                if (hasValue(useDiy)) {
                    useDiy = parseInt(useDiy);
                } else {
                    useDiy = null;
                }
                Window.jsDetailData.useDiy = useDiy;
            } else {
                return hasValueV2(Window.jsDetailData.useDiy) ? Window.jsDetailData.useDiy : null;
            }
        };

        _this.reasonNotUseDiy = function (reasonNotUseDiy) {
            if (!isUndefined(reasonNotUseDiy)) {
                reasonNotUseDiy = $.trim(reasonNotUseDiy);
                if (!hasValue(reasonNotUseDiy)) {
                    reasonNotUseDiy = null;
                    _this.useDiy(null);
                }
                Window.jsDetailData.reasonNotUseDiy = reasonNotUseDiy;
            } else {
                return hasValueV2(Window.jsDetailData.reasonNotUseDiy) ? Window.jsDetailData.reasonNotUseDiy : null;
            }
        };

        _this.diyContent = function (diyContent) {
            if (!isUndefined(diyContent)) {
                if (hasValue(diyContent)) {
                    diyContent = diyContent.trim();
                } else {
                    diyContent = null;
                }
                Window.jsDetailData.diyInfo.content = diyContent;
            } else {
                return hasValue(Window.jsDetailData.diyInfo) ? Window.jsDetailData.diyInfo.content : null;
            }
        };

        _this.diyPrice = function (diyPrice) {
            if (!isUndefined(diyPrice)) {
                if (hasValue(diyPrice)) {
                    diyPrice = parseFloat(diyPrice.trim().replace(/,/g, ''));
                } else {
                    diyPrice = null;
                }
                Window.jsDetailData.diyInfo.price = diyPrice;
            } else {
                return hasValue(Window.jsDetailData.diyInfo) ? Window.jsDetailData.diyInfo.price : null;
            }
        };

        _this.diyStopReasonList = function () {
            var diyStopReasonList = [];
            if (hasValue(Window.jsDetailData.diyInfo)) {
                if (Window.jsDetailData.diyInfo.stop) {
                    diyStopReasonList = Window.jsDetailData.diyInfo.stop.reasons;
                }
            }
            return diyStopReasonList;
        };

        _this.diyStopInfo = function () {
            var diyStopInfo = [];
            if (hasValue(Window.jsDetailData.diyInfo)) {
                diyStopInfo = Window.jsDetailData.diyInfo.stop;
            }
            return diyStopInfo;
        };

        _this.photos = function (photos) {
            if (!isUndefined(photos)) {
                if (!hasValue(photos)) {
                    photos = null;
                } else {
                    // no case
                }
                Window.jsDetailData.photos = photos;
            } else {
                return hasValueV2(Window.jsDetailData.photos) ? Window.jsDetailData.photos : [];
            }
        };
        _this.virtualTouring = function (virtualTouring) {
            if (!isUndefined(virtualTouring)) {
                if (!hasValue(virtualTouring)) {
                    virtualTouring = null;
                }
                Window.jsDetailData.virtualTouring = virtualTouring;
            } else if (hasValueV2(Window.jsDetailData.virtualTouring) && !Window.jsDetailData.oldVirtualTouring) {
                Window.jsDetailData.oldVirtualTouring = Window.jsDetailData.virtualTouring;
                Window.jsDetailData.virtualTouring = Window.jsDetailData.oldVirtualTouring.url;
            }
            
            return Window.jsDetailData.virtualTouring;
        };
        _this.photo360 = function (photos) {
            if (!isUndefined(photos)) {
                if (!hasValue(photos)) {
                    photos = null;
                } else {
                    // no case
                }
                Window.jsDetailData.virtualTour360s = photos;
            } else {
                return hasValueV2(Window.jsDetailData.virtualTour360s) ? Window.jsDetailData.virtualTour360s : [];
            }
        };

        _this.photoGcns = function (photoGcns) {
            if (!isUndefined(photoGcns)) {
                if (!hasValue(photoGcns)) {
                    photoGcns = null;
                } else {
                    // no case
                }
                Window.jsDetailData.photoGcns = photoGcns;
            } else {
                return hasValueV2(Window.jsDetailData.photoGcns) ? Window.jsDetailData.photoGcns : [];
            }
        };

        _this.photoSas = function (photoSas) {
            if (!isUndefined(photoSas)) {
                if (!hasValue(photoSas)) {
                    photoSas = null;
                } else {
                    // no case
                }
                Window.jsDetailData.photoSas = photoSas;
            } else {
                return hasValueV2(Window.jsDetailData.photoSas) ? Window.jsDetailData.photoSas : [];
            }
        };

        _this.lotSize = function (lotSize) {
            if (!isUndefined(lotSize)) {
                if (!hasValue(lotSize)) {
                    lotSize = null;
                } else {
                    lotSize = parseFloat(lotSize.replace(/,/g, ''));
                }
                Window.jsDetailData.lotSize = lotSize;
            } else {
                return hasValueV2(Window.jsDetailData.lotSize) ? Window.jsDetailData.lotSize : null;
            }
        };

        _this.floorSize = function (floorSize) {
            if (!isUndefined(floorSize)) {
                if (!hasValue(floorSize)) {
                    floorSize = null;
                } else {
                    floorSize = parseFloat(floorSize.replace(/,/g, ''));
                }
                Window.jsDetailData.floorSize = floorSize;
            } else {
                return hasValueV2(Window.jsDetailData.floorSize) ? Window.jsDetailData.floorSize : null;
            }
        };

        _this.sizeLength = function (sizeLength) {
            if (!isUndefined(sizeLength)) {
                if (!hasValue(sizeLength)) {
                    sizeLength = null;
                } else {
                    sizeLength = parseFloat(sizeLength.replace(/,/g, ''));
                }
                Window.jsDetailData.sizeLength = sizeLength;
            } else {
                return hasValueV2(Window.jsDetailData.sizeLength) ? Window.jsDetailData.sizeLength : null;
            }
        };

        _this.sizeWidth = function (sizeWidth) {
            if (!isUndefined(sizeWidth)) {
                if (!hasValue(sizeWidth)) {
                    sizeWidth = null;
                } else {
                    sizeWidth = parseFloat(sizeWidth.replace(/,/g, ''));
                }
                Window.jsDetailData.sizeWidth = sizeWidth;
            } else {
                return hasValueV2(Window.jsDetailData.sizeWidth) ? Window.jsDetailData.sizeWidth : null;
            }
        };

        _this.directionId = function (directionId) {
            if (!isUndefined(directionId)) {
                if (!hasValue(directionId)) {
                    directionId = null;
                } else {
                    directionId = parseInt(directionId.replace(/,/g, ''));
                }
                Window.jsDetailData.directionId = directionId;
            } else {
                return hasValueV2(Window.jsDetailData.directionId) ? Window.jsDetailData.directionId : null;
            }
        };

        _this.legalStatusList = function (legalStatusList) {
            if (!isUndefined(legalStatusList)) {
                if (!hasValue(legalStatusList)) {
                    legalStatusList = null;
                } else {
                    // no case
                }
                Window.jsDetailData.legalStatusList = legalStatusList;
            } else {
                return hasValueV2(Window.jsDetailData.legalStatusList) ? Window.jsDetailData.legalStatusList : null;
            }
        };

        _this.haveSupportLegal = function (haveSupportLegal) {
            if (!isUndefined(haveSupportLegal)) {
                if (hasValue(haveSupportLegal)) {
                    haveSupportLegal = true;
                } else {
                    haveSupportLegal = false;
                }
                Window.jsDetailData.haveSupportLegal = haveSupportLegal;
            } else {
                return hasValueV2(Window.jsDetailData.haveSupportLegal) ? Window.jsDetailData.haveSupportLegal : null;
            }
        };

        _this.isDoneForDiy = function (isDoneForDiy) {
            if (!isUndefined(isDoneForDiy)) {
                if (hasValue(isDoneForDiy)) {
                    isDoneForDiy = true;
                } else {
                    isDoneForDiy = false;
                }
                Window.jsDetailData.isDoneForDiy = isDoneForDiy;
            } else {
                return hasValueV2(Window.jsDetailData.isDoneForDiy) ? Window.jsDetailData.isDoneForDiy : false;
            }
        };

        _this.advantages = function (advantages) {
            if (!isUndefined(advantages)) {
                Window.jsDetailData.advantages = !hasValue(advantages) ? [] : advantages;
            } else {
                return hasValueV2(Window.jsDetailData.advantages) ? Window.jsDetailData.advantages : [];
            }
        };

        _this.disadvantages = function (disadvantages) {
            if (!isUndefined(disadvantages)) {
                Window.jsDetailData.disadvantages = !hasValue(disadvantages) ? [] : disadvantages;
            } else {
                return hasValueV2(Window.jsDetailData.disadvantages) ? Window.jsDetailData.disadvantages : [];
            }
        };

        _this.isGuaranteed = function (isGuaranteed) {
            if (!isUndefined(isGuaranteed)) {
                if (hasValue(isGuaranteed)) {
                    isGuaranteed = true;
                } else {
                    isGuaranteed = false;
                }
                Window.jsDetailData.isGuaranteed = isGuaranteed;
            } else {
                return hasValueV2(Window.jsDetailData.isGuaranteed) ? Window.jsDetailData.isGuaranteed : null;
            }
        };

        _this.amenitiesList = function (amenitiesList) {
            if (!isUndefined(amenitiesList)) {
                if (!hasValue(amenitiesList)) {
                    amenitiesList = null;
                } else {
                    // no case
                }
                Window.jsDetailData.amenitiesList = amenitiesList;
            } else {
                return hasValueV2(Window.jsDetailData.amenitiesList) ? Window.jsDetailData.amenitiesList : null;
            }
        };

        _this.privacy = function (privacy) {
            return returnValue('privacy', privacy)
        };

        _this.title = function (title) {
            if (!isUndefined(title)) {
                if (!hasValue(title)) {
                    title = null;
                } else {
                    title = title.trim();
                }
                Window.jsDetailData.title = title;
            } else {
                return hasValueV2(Window.jsDetailData.title) ? Window.jsDetailData.title : null;
            }
        };

        _this.description = function (description) {
            if (!isUndefined(description)) {
                if (!hasValue(description)) {
                    description = null;
                } else {
                    description = description.trim();
                }
                Window.jsDetailData.description = description;
            } else {
                return hasValueV2(Window.jsDetailData.description) ? Window.jsDetailData.description : null;
            }
        };

        _this.metaTitle = function (metaTitle) {
            if (!isUndefined(metaTitle)) {
                if (!hasValue(metaTitle)) {
                    metaTitle = null;
                } else {
                    metaTitle = metaTitle.trim();
                }
                Window.jsDetailData.metaTag.title = metaTitle;
            } else {
                return hasValueV2(Window.jsDetailData.metaTag.title) ? Window.jsDetailData.metaTag.title : null;
            }
        };

        _this.metaDescription = function (metaDescription) {
            if (!isUndefined(metaDescription)) {
                if (!hasValue(metaDescription)) {
                    metaDescription = null;
                } else {
                    metaDescription = metaDescription.trim();
                }
                Window.jsDetailData.metaTag.description = metaDescription;
            } else {
                return hasValueV2(Window.jsDetailData.metaTag.description) ? Window.jsDetailData.metaTag.description : null;
            }
        };

        _this.metaKeywords = function (metaKeywords) {
            if (!isUndefined(metaKeywords)) {
                if (!hasValue(metaKeywords)) {
                    metaKeywords = null;
                } else {
                    metaKeywords = metaKeywords.trim();
                }
                Window.jsDetailData.metaTag.keywords = metaKeywords;
            } else {
                return hasValueV2(Window.jsDetailData.metaTag.keywords) ? Window.jsDetailData.metaTag.keywords : null;
            }
        };

        _this.cityId = function (cityId) {
            if (!isUndefined(cityId)) {
                if (!hasValue(cityId)) {
                    cityId = null;
                } else {
                    cityId = cityId.trim();
                }
                Window.jsDetailData.cityId = cityId;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.cityId : null;
            }
        };

        _this.districtId = function (districtId) {
            if (!isUndefined(districtId)) {
                if (!hasValue(districtId)) {
                    districtId = '';
                } else {
                    districtId = parseInt(districtId.trim());
                }
                Window.jsDetailData.districtId = districtId;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.districtId : null;
            }
        };

        _this.wardId = function (wardId) {
            if (!isUndefined(wardId)) {
                if (!hasValue(wardId)) {
                    wardId = '';
                } else {
                    wardId = parseInt(wardId.trim());
                }
                Window.jsDetailData.wardId = wardId;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.wardId : '';
            }
        };

        _this.streetId = function (streetId) {
            if (!isUndefined(streetId)) {
                if (!hasValue(streetId)) {
                    streetId = '';
                } else {
                    streetId = parseInt(streetId.trim());
                }
                Window.jsDetailData.streetId = streetId;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.streetId : '';
            }
        };



        _this.houseNumber = function (houseNumber) {
            if (!isUndefined(houseNumber)) {
                houseNumber = hasValue(houseNumber) ? houseNumber.trim() : null;

                Window.jsDetailData.houseNumber = houseNumber;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.houseNumber : null;
            }
        };

        _this.havePlanning = function (havePlanning) {
            if (!isUndefined(havePlanning)) {
                havePlanning = hasValue(havePlanning) ? havePlanning.trim() : null;
                Window.jsDetailData.havePlanning = havePlanning;
                // case change havingPlaning different "Có thông tin"
                if (havePlanning !== "1") {
                    Window.jsDetailData.plan.area = null;
                }
            } else {
                return hasValue(Window.jsDetailData.havePlanning) ? parseInt(Window.jsDetailData.havePlanning) : 0;
            }
        };
        _this.planingNote = function (planningInfo) {
            if (!isUndefined(planningInfo)) {
                planningInfo = hasValue(planningInfo) ? planningInfo.trim() : null;
                Window.jsDetailData.plan.note = planningInfo;
            } else {
                return hasValueV2(Window.jsDetailData.plan && Window.jsDetailData.plan.note) ? Window.jsDetailData.plan.note : null;
            }
        };

        _this.planingRightOfWay = function (rightOfWay) {
            if (!isUndefined(rightOfWay)) {

                rightOfWay = hasValue(rightOfWay) ? rightOfWay.trim() : null;
                Window.jsDetailData.plan.rightOfWay = rightOfWay;
            } else {
                return hasValueV2(Window.jsDetailData.plan && Window.jsDetailData.plan.rightOfWay) ? Window.jsDetailData.plan.rightOfWay : null;
            }
        };
        _this.planingType = function (planingType) {
            if (!isUndefined(planingType)) {

                planingType = hasValue(planingType) ? planingType : null;
                Window.jsDetailData.plan.type = planingType;
            } else {
                return hasValueV2(Window.jsDetailData.plan && Window.jsDetailData.plan.type) ? Window.jsDetailData.plan.type : null;
            }
        };
        _this.planingArea = function (planingArea) {
            if (!isUndefined(planingArea)) {
                Window.jsDetailData.plan.area = planingArea;
            } else {
                return hasValueV2(Window.jsDetailData.plan && Window.jsDetailData.plan.area) ? Window.jsDetailData.plan.area : null;
            }
        };
        _this.planingAreaOther = function () {
            const lotSize = _this.lotSize();
            const planingArea = _this.planingArea();
            let planingOther = 0;
            if (hasValue(lotSize)) {
                planingOther = lotSize;
                if (hasValue(planingArea)) {
                    planingOther = (lotSize - planingArea).toFixed(2);
                }
            }
            return planingOther;
        };
        _this.planingAreaPercent = function () {
            const lotSize = _this.lotSize();
            const planingArea = _this.planingArea();
            let planing = 0;
            if (hasValue(lotSize)) {
                if (hasValue(planingArea)) {
                    planing = (planingArea / lotSize) * 100;
                }
            }
            return planing.toFixed(2) + '%';
        };
        _this.planingAreaOtherPercent = function () {
            const lotSize = _this.lotSize();
            const planingArea = _this.planingArea();
            let planing = 0;
            if (hasValue(lotSize)) {
                planing = 100;
                if (hasValue(planingArea)) {
                    planing = ((lotSize - planingArea) / lotSize) * 100;
                }
            }
            return planing.toFixed(2) + '%';
        };
        _this.planingPhotos = function (photos) {
            if (!isUndefined(photos)) {
                photos = photos && Array.isArray(photos) && photos.length > 0 ? photos : [];
                Window.jsDetailData.plan.photos = photos;
            } else {
                return hasValueV2(Window.jsDetailData.plan && Window.jsDetailData.plan.photos) ? Window.jsDetailData.plan.photos : [];
            }
        };


        _this.tcid = function (tcid) {
            if (!isUndefined(tcid)) {
                if (!hasValue(tcid)) {
                    tcid = null;
                } else {
                    tcid = tcid.trim();
                }
                Window.jsDetailData.tcid = tcid;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.tcid : null;
            }
        };
        _this.tcName = function (tcName) {
            if (!isUndefined(tcName)) {
                if (!hasValue(tcName)) {
                    tcName = null;
                } else {
                    tcName = tcName.trim();
                }
                Window.jsDetailData.tcid = tcName;
            } else {
                return hasValueV2(Window.jsDetailData) && hasValueV2(Window.jsDetailData.tcName) ? Window.jsDetailData.tcName : 'N/A';
            }
        };
        _this.mortgaged = function (mortgaged) {
            if (!isUndefined(mortgaged)) {
                Window.jsDetailData.mortgaged = hasValue(mortgaged);
            } else {
                return hasValueV2(Window.jsDetailData.mortgaged) ? Window.jsDetailData.mortgaged : null;
            }
        };
        _this.bankId = function (bankId) {
            return returnValue('bankId', bankId)
        };

        _this.projectId = function (projectId) {
            if (!isUndefined(projectId)) {
                if (!hasValue(projectId)) {
                    projectId = null
                } else {
                    projectId = projectId
                }
                Window.jsDetailData.projectId = projectId;
            } else {
                return hasValueV2(Window.jsDetailData) ? Window.jsDetailData.projectId : null;
            }
        };
        _this.xCoordinate = function (xCoordinate) {
            if (!isUndefined(xCoordinate)) {
                Window.jsDetailData.xCoordinate = hasValue(xCoordinate) ? Number.parseFloat(xCoordinate) : null;
            } else {
                return hasValueV2(Window.jsDetailData.xCoordinate) ? Window.jsDetailData.xCoordinate : null;
            }
        };
        _this.yCoordinate = function (yCoordinate) {
            if (!isUndefined(yCoordinate)) {
                Window.jsDetailData.yCoordinate = hasValue(yCoordinate) ? Number.parseFloat(yCoordinate) : null;
            } else {
                return hasValueV2(Window.jsDetailData.yCoordinate) ? Window.jsDetailData.yCoordinate : null;
            }
        };

        _this.isCashBack = function (isCashBack) {
            if (!isUndefined(isCashBack)) {
                Window.jsDetailData.isCashBack = !!isCashBack;
            } else {
                return hasValueV2(Window.jsDetailData.isCashBack) ? Window.jsDetailData.isCashBack : null;
            }
        };

        _this.campaignId = function (campaignId) {
            if (!isUndefined(campaignId)) {
                Window.jsDetailData.campaignId = hasValue($.trim(campaignId)) ? campaignId : null;
            } else {
                return hasValueV2(Window.jsDetailData.campaignId) ? Window.jsDetailData.campaignId : null;
            }
        };
        _this.campaignChecked = function (campaignChecked) {
            if (!isUndefined(campaignChecked)) {
                Window.jsDetailData.campaignChecked = !!campaignChecked;
            } else {
                if (typeof (Window.jsDetailData.campaignChecked) !== "undefined") {
                    return Window.jsDetailData.campaignChecked;
                } else {
                    if (Window.jsDetailData.campaignId !== null) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        };
        _this.autoAssign = function (autoAssign) {
            if (!isUndefined(autoAssign)) {
                Window.jsDetailData.autoAssign = !!autoAssign;
            } else {
                return hasValueV2(Window.jsDetailData.autoAssign) ? Window.jsDetailData.autoAssign : false;
            }
        };

        _this.data = function () {
            return Window.jsDetailData;
        }

        _this.isbuilding = function (isbuilding) {
            return returnValue('isbuilding', isbuilding)
        };

        function getItemOfSocialOwner(social, callback) {
            if (social.length > 0) {
                var isAgentType = true;
                var item = null;
                var i = 0;
                while (isAgentType && i < social.length) {
                    item = social[i];
                    if (!hasValue(item.agentType)) {
                        if (callback) callback({item: item, index: i});
                        //$.extend(Window.jsDetailData.socialCommunications[i], {'phones' : phones})
                        isAgentType = false;
                    }
                    i++;
                }
            }
        }

        function getItemOfSocialAgent(social, callback) {
            if (social.length > 0) {
                var isNotAgentType = true;
                var item = null;
                var i = 0;
                while (isNotAgentType && i < social.length) {
                    item = social[i];
                    if (hasValue(item.agentType)) {
                        if (callback) callback({item: item, index: i});
                        isNotAgentType = false;
                    }
                    i++;
                }
            }
        }
    }
}