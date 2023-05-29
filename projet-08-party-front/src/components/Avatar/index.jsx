import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import "./styles.scss";

export default function FallbackAvatars() {
   return (
      <Stack className='avatar' direction='row' spacing={2}>
         <Avatar src='/broken-image.jpg' sx={{ width: 100, height: 100 }} />
      </Stack>
   );
}
