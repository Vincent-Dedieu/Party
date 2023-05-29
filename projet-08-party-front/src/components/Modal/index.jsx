import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import { Stack } from "@mui/system";

const style = {
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: "70%",
   heigth: "60%",
   bgcolor: "background.paper",
   boxShadow: 24,
   borderRadius: 5,
   p: 4,
   m: "auto",
};

const ModalEvent = ({ open, handleClose }) => {
   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
         >
            <Box sx={style}>
               <ClearIcon
                  onClick={handleClose}
                  sx={{
                     position: "absolute",
                     top: 8,
                     right: 10,
                     border: "1px solid black",
                     borderRadius: 50,
                  }}
               />
               <Stack spacing={2} direction='column' alignItems='center'>
                  <TextField
                     id='outlined-basic'
                     label='Produit'
                     variant='outlined'
                  />
                  <TextField
                     id='outlined-basic'
                     label='Quantité'
                     variant='outlined'
                  />
                  <Button sx={{ width: "60%" }} variant='contained'>
                     Valider
                  </Button>
               </Stack>
            </Box>
         </Modal>
      </div>
   );
};

export default ModalEvent;
