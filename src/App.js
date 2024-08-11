import { useEffect } from "react";
import "./App.css";
import { Form } from "./Form/Form";
import { Results } from "./Results/Results";
import { useForm, FormProvider } from "react-hook-form";

function App() {
  const methods = useForm({
    defaultValues: {
      adultCount: 0,
      childrenCount: 0,
      animalsCount: 0,
      inputValueLocation: '',
      travelingWithChildrenOrAnimals: false,
      inputCheckboxTermAndConditions: false,
      inputRadioYesOrNoTravelingForWork: false,
      changeViewFormOrResults: false,
    },
  });

  const { watch, setValue } = methods;

  const {
    adultCount,
    childrenCount,
    animalsCount,
    inputValueLocation,
    inputRadioYesOrNoTravelingForWork,
    changeViewFormOrResults,
  } = watch();

  const handleBookNowClick  = () => {
    setValue('changeViewFormOrResults', true);
  };

  const handleBackClick  = () => {
    setValue('inputCheckboxTermAndConditions', false);
    setValue('changeViewFormOrResults', false);
  };

  useEffect(() => {
      console.log("User changed adult counter value. New value:", adultCount);
  }, [adultCount, childrenCount, animalsCount]);

  return (
    <FormProvider {...methods}>
    <div className="App">
      <header>

          <div>
            { changeViewFormOrResults ? (
              <Results 
                location={inputValueLocation} 
                totalPass={adultCount + childrenCount} 
                adultCount={adultCount} 
                childrenCount={childrenCount} 
                animalsCount={animalsCount} 
                travelingWork={inputRadioYesOrNoTravelingForWork === "yes" ? "" : "not"}
                onBackClick={handleBackClick}
              />
            ) : (
              <Form
                onBookNowClick={handleBookNowClick}
              />
            )
            }
          </div>
      </header>
    </div>
    </FormProvider>
  );
}

export default App;
