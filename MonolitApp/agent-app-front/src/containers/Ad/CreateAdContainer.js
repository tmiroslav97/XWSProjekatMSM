import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateAd from '../../components/Ad/CreateAd';
import { createdAd } from '../../store/ad/actions';
import Form1CreateAdContainer from './Form1CreateAdContainer';
import Form2CreateAdContainer from './Form2CreateAdContainer';
import Form3CreateAdContainer from './Form3CreateAdContainer';
import Form4CreateAdContainer from './Form4CreateAdContainer';
import Form5CreateAdContainer from './Form5CreateAdContainer';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Stepper, Step, StepLabel, makeStyles, Typography } from '@material-ui/core';


const CreateAdContainer = () => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [coverPhoto, setCoverPhoto] = useState();
    const [distanceLimitFlag, setDistanceLimitFlag] = useState(false);
    const [distanceLimit, setDistanceLimit] = useState();
    const [cdw, setCdw] = useState(false);
    const [androidFlag, setAndroidFlag] = useState(false);
    const [coverPhotoName, setCoverPhotoName] = useState("");
    const [photos, setPhotos] = useState([]);

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const steps = ['Osnovne informacije', 'Dodatne informacije', 'Cena', 'Dostupnost', 'Slike'];
    // const classes = useStyles();


    const [formData, setFormData] = useState({
        name: null,
        location: null,
        distanceLimitFlag: null,
        distanceLimit: null,
        carManufacturer: null,
        carModel: null,
        carType: null,
        year: null,
        mileage: null,
        gearboxType: null,
        fuelType: null,
        childrenSeatNum: null,
        cdw: null,
        androidFlag: null,
        pricePerKm: null,
        pricePerKmCDW: null,
        pricePerDay: null,
        id: null,
        carCalendarTermCreateDTOList: null
    });

    

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         width: '100%',
    //     },
    //     button: {
    //         marginRight: theme.spacing(1),
    //     },
    //     instructions: {
    //         marginTop: theme.spacing(1),
    //         marginBottom: theme.spacing(1),
    //     },
    // }));

    const handleCreatedAd = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            let data = {
                'name': form.name.value,
                'coverPhoto': coverPhotoName,
                'location': form.location.value,
                'distanceLimitFlag': distanceLimitFlag,
                'distanceLimit': distanceLimit,
                'carCreateDTO': {
                    'carManufacturer': form.carManufacturer.value,
                    'carModel': form.carModel.value,
                    'carType': form.carType.value,
                    'year': form.year.value,
                    'mileage': form.mileage.value,
                    'gearboxType': form.gearboxType.value,
                    'fuelType': form.fuelType.value,
                    'childrenSeatNum': form.childrenSeatNum.value,
                    'cdw': cdw,
                    'androidFlag': androidFlag,
                },
                'priceListCreateDTO': {
                    'pricePerKm': form.pricePerKm.value,
                    'pricePerKmCDW': form.pricePerKmCDW.value,
                    'pricePerDay': form.pricePerDay.value,
                    'id': 0,
                    // 'id': form.id.value,
                },
                'carCalendarTermCreateDTOList': null
            }
            let formData = new FormData(form);
            formData.append('data', JSON.stringify(data));
            dispatch(createdAd(formData));
            setValidated(false);
        }
    };

    const handleDistanceLimitFlag = (event) => {
        setDistanceLimitFlag(event.target.checked);
        setDistanceLimit(null);
    };

    const handleCDW = (event) => {
        setCdw(event.target.checked);
    };

    const handleAndroidFlag = (event) => {
        setAndroidFlag(event.target.checked);
    };

    const onPhotoChange = (event) => {

        if (event.target.files != null) {
            let p = photos;
            let name = event.target.files[0].name;
            console.log(event.target);
            console.log(event.target.files[0]);
            let flag = 0;

            p.map((photo) => {
                if (photo.photoName === name) {
                    flag = 1;
                    console.log("Isti fajl");
                }

            })
            if (flag != 1) {
                p.push(
                    {
                        photoName: event.target.files[0].name,
                        photo: event.target.files[0]
                    }
                )
                setPhotos(p);
            }
            let nazivi = "";
            let slike = [];
            p.map((photo) => {
                slike.push(photo.photo);
                nazivi += " " + photo.photoName;
            })
            console.log(nazivi);
            console.log(slike);


            setCoverPhoto(event.target.files[0]);
            setCoverPhotoName(event.target.files[0].name);
        }

    };

    const isStepOptional = (step) => {
        return step === 3;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setSkipped(newSkipped);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    return (
        <Container>
            <CreateAd onSubmit={handleCreatedAd}
                validated={validated}
                distanceLimitFlag={distanceLimitFlag}
                cdw={cdw}
                androidFlag={androidFlag}
                coverPhotoName={coverPhotoName}
                handleDistanceLimitFlag={handleDistanceLimitFlag}
                onPhotoChange={onPhotoChange}
                handleAndroidFlag={handleAndroidFlag}
                handleCDW={handleCDW}
                skipped={skipped}
                setSkipped={setSkipped}
                isStepOptional={isStepOptional}
                isStepSkipped={isStepSkipped}
                // classes={classes}
                steps={steps}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSkip={handleSkip}
                handleReset={handleReset}
                formData={formData} setFormData={setFormData}
                activeStep={activeStep} setActiveStep={setActiveStep}
            />
            {activeStep === 0 ?
                <Form1CreateAdContainer
                    formData={formData} setFormData={setFormData}
                    activeStep={activeStep} setActiveStep={setActiveStep}
                    steps={steps}
                    isStepOptional={isStepOptional}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSkip={handleSkip}
                    handleReset={handleReset}
                ></Form1CreateAdContainer>
                : null
            }
            {activeStep === 1 ?
                <Form2CreateAdContainer
                    formData={formData} setFormData={setFormData}
                    activeStep={activeStep} setActiveStep={setActiveStep}
                    steps={steps}
                    isStepOptional={isStepOptional}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSkip={handleSkip}
                    handleReset={handleReset}
                ></Form2CreateAdContainer>
                : null
            }
            {activeStep === 2 ?
                <Form3CreateAdContainer
                    formData={formData} setFormData={setFormData}
                    activeStep={activeStep} setActiveStep={setActiveStep}
                    steps={steps}
                    isStepOptional={isStepOptional}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSkip={handleSkip}
                    handleReset={handleReset}
                ></Form3CreateAdContainer>
                : null
            }
            {activeStep === 3 ?
                <Form4CreateAdContainer
                    formData={formData} setFormData={setFormData}
                    activeStep={activeStep} setActiveStep={setActiveStep}
                    steps={steps}
                    isStepOptional={isStepOptional}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSkip={handleSkip}
                    handleReset={handleReset}
                ></Form4CreateAdContainer>
                : null
            }
            {activeStep === 4 ?
                <Form5CreateAdContainer
                    formData={formData} setFormData={setFormData}
                    activeStep={activeStep} setActiveStep={setActiveStep}
                    steps={steps}
                    isStepOptional={isStepOptional}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    handleSkip={handleSkip}
                    handleReset={handleReset}
                    handleCreatedAd={handleCreatedAd}
                ></Form5CreateAdContainer>
                : null
            }

        </Container>


    )
}

export default CreateAdContainer;