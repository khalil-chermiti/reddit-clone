import {useSelector} from 'react-redux'
import {selectError} from '../redux/posts/postsSlice'
import {Alert as CostumAlert,AlertIcon,AlertTitle,AlertDescription} from '@chakra-ui/react'
const Alert = () => {
    const error = useSelector(selectError)
    if(error){
        return(
                
            <CostumAlert status='error'>
                <AlertIcon />
                <AlertTitle>Could not create Post</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </CostumAlert>

        )
    }
    else{
        return(
            
            <CostumAlert status='success'>
            <AlertIcon />
            Your post was added successfully!
          </CostumAlert>
            
        )
      
    }
    
  }

export default Alert