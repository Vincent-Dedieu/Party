import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function FolderList({ title, date }) {
   return (
      <List
         sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "#A5A9B6",
            borderRadius: "14px",
         }}
      >
         <ListItem>
            <ListItemAvatar>
               <Avatar>
                  <ImageIcon />
               </Avatar>
            </ListItemAvatar>
            <ListItemText primary={title} secondary={date} />
            <AccountBoxIcon fontSize='large' />
         </ListItem>
      </List>
   );
}
