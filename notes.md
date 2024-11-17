# Notes

- App.js
  - [x] Set view engine
  - [x] Set public folder
  - [x] Passport strategy
  - [x] Bcrypt setup

- Sign Up
  - [x] View with confirm passport
  - [x] Controller to save to database
  - [x] db query to create user
  - [x] Save the password with bcrypt

- Sign In
  - [x] View for sign in
  - [x] Controller for sign in
  - [x] Routes for sign in
  - [x] check passwords with Bcrypt

- folders
  - [x] View which includes name & optional parent folder? 
  - [x] Controller to get and post
  - [x] Routes to get and post
  - [x] db queries
  - [x] Move folders (hierarchy)
  - [x] update name 
  - [x] delete folders
    - [x] Re work into modal.

- Create files
  - [x] Upload files to specific folders
  - [x] Save to file system
    - [x] Later save to online storage
  - [x] delete files
    - [x] Use modal.
  - [ ] move files
  - ~~Rename files~~ Come back to this if I have time
  - [x] Get file details + download


- User
  - [x] Should be able to delete user
    - [x] With all files and folders

- [ ] Supabase
  - [x] Upload file
  - [x] Download file
  - [?] Delete file (Need to test)
  - [x] Share file? 
    - [x] Added to table
    - [x] view for share folder form
    - [x] Implement routes (/share/:uuid)
      - [x] folder share get & post
      - [x] share get
    - [x] Implement controller
    - [x] Job to delete null shareId and ShareDate?  

- [x] Styling
  - [x] Create folder select needs stlying to match input
  - [x] Delete folder btn needs updating
  - [x] file detail

- [x] Share folders



- Nice to have
  - drag & drop folders to create relations
  - drag & drop files
  - Custom right click to delete, rename etc


------

Thinking through model....

Folders can have folders within them
Folders can have files within them
Users have access to folders
Users have acceess to files -- scrap this. Sharing based on folders, will have access to all files in the folder. 


------
