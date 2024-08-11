import { Counter } from "../Counter/Counter";
import formStyles from './form.module.css';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { useFormContext } from 'react-hook-form';

export const Form = ({onBookNowClick}) => {

    const {
        register,
        watch,
        setValue,
      } = useFormContext();
    
      const inputValueLocation = watch('inputValueLocation');
      const inputCheckboxChildrenOrAnimals = watch('inputCheckboxChildrenOrAnimals');
      const inputCheckboxTermAndConditions = watch('inputCheckboxTermAndConditions');
      const inputRadioYesOrNoTravelingForWork = watch('inputRadioYesOrNoTravelingForWork');
      const adultCount = watch('adultCount');
      const childrenCount = watch('childrenCount');
      const animalsCount = watch('animalsCount');

    return (
        <div className={formStyles.divForms}>
            <div className={formStyles.divTotalPassengers}>
                <p className={formStyles.paragraphTotalPassengers}>
                    Total passengers: {adultCount + childrenCount}
                </p>
            </div>

            <Counter 
                setValue={(value) => setValue('adultCount', value)}
                value={adultCount} 
                maxValue={8} 
                tag="adult"
            />

            <div>
                <FormControlLabel 
                    control={<Checkbox 
                        {...register('inputCheckboxChildrenOrAnimals')}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                    />} 
                    label="Are you travelling with children or animals?" 
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: '1.5rem',
                        },  
                    }}
                />

                { inputCheckboxChildrenOrAnimals && <> 
                    <Counter 
                        {...register('childrenCount')}
                        setValue={(value) => setValue('childrenCount', value)}
                        value={childrenCount} 
                        maxValue={4} 
                        tag="children"
                    />

                    <Counter 
                        {...register('animalsCount')}
                        setValue={(value) => setValue('animalsCount', value)}
                        value={animalsCount}
                        maxValue={2} 
                        tag="animals"
                    />
                </>}
            </div>

            <div>
                <TextField 
                    {...register('inputValueLocation')}
                    value={inputValueLocation}
                    id="outlined-basic" 
                    label="Where are you going today?" 
                    variant="outlined"
                    sx={{
                        margin: 2,
                        width: '95%',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#59abe3',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#59abe3',
                            },
                            '&.Mui-focused.MuiInputBase-root': {
                                '& input': {
                                    borderColor: '#59abe3',
                                },
                            },
                        }
                    }}
                />

            </div>

            <div>

                <FormControl>
                    <FormLabel 
                        id="demo-row-radio-buttons-group-label"
                        sx={{
                            fontSize: '1.5rem',
                            color: '#333',
                        }}>
                        Are you traveling for work?
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        {...register('inputRadioYesOrNoTravelingForWork')}
                        sx={{
                            justifyContent: 'center', 
                        }}>
                        <FormControlLabel 
                            value="yes" 
                            control={<Radio 
                                value="yes" 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                            />} 
                            label="Yes" />
                        <FormControlLabel 
                            value="no" 
                            control={<Radio 
                                value="no" 
                                sx={{'& .MuiSvgIcon-root': { fontSize: 20 } }}
                            />} 
                            label="No" />
                    </RadioGroup>
                </FormControl>

            </div>

            <div>

                <FormControlLabel 
                    control={<Checkbox 
                        {...register('inputCheckboxTermAndConditions')}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                        checked={inputCheckboxTermAndConditions} 
                    />} 
                    label="Do you accept terms and conditions?" 
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: '1.5rem',
                        },  
                    }}
                />

                <div>

                    <Button 
                        variant="contained"
                        disabled={!inputCheckboxTermAndConditions}
                        onClick={onBookNowClick}
                        sx={{
                            fontSize: '1.2rem',
                            marginTop: '1rem',
                            backgroundColor: '#59abe3',
                            '&:hover': {
                                backgroundColor: '#146ba5', 
                            },
                        }}
                    >
                        Book now
                    </Button>

                </div> 

            </div>
        </div>
    )
}