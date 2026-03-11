import useNotes from './hooks/useNotes';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator, Button, Divider, Flex, Grid, Heading, Image, Text, TextField, View } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

Amplify.configure(outputs);
// eslint-disable-next-line react-refresh/only-export-components
export const client = generateClient<Schema>({
  authMode: "userPool" // AWS Cognito user pool
});

export default function App() {
  const { notes, createNote, deleteNote } = useNotes();

  // return (
  //   <Authenticator>
  //     {({ signOut }) => (
  //       <div className='flex flex-col justify-center items-center w-[70%] my-0 mx-auto'>
  //         <h1>Notes App</h1>
  //         <View as='form' className='my-12' onSubmit={(e) => createNote(new FormData(e.target))}>
  //           <div className='flex flex-col justify-center gap-8 p-8'>
  //             <TextField name='name' placeholder='Note Name' label='Note Name' labelHidden variation='quiet' required/>
  //             <TextField name='description' placeholder='Note Description' label='Note Description' labelHidden variation='quiet' required/>
  //             <View as='input' name='image' type='file' className='self-end' accept='image/png, image/jpeg' />
              
  //             <Button type='submit' variation='primary'>
  //               Create Note
  //             </Button>
  //           </div>
  //         </View>

  //         <Divider />

  //         <h2>Current Notes</h2>
  //         <Grid className='my-12 grid-flow-col justify-center content-center gap-8'>
  //           {notes.map((note) => (
  //             <div key={note.id || note.name} className='flex flex-col justify-center items-center gap-8 border border-slate-100 p-8 rounded-[5%] box'>
  //               <View>
  //                 <h3>{note.name}</h3>
  //               </View>
  //               <Text fontStyle='italic'>{note.description}</Text>
  //               {note.image && (
  //                 <Image src={note.image} alt={`Visual aid for ${note.name}`} className='w-[400]' />
  //               )}
  //               <Button variation='destructive' onClick={() => deleteNote(note.id)}>
  //                 Delete Note
  //               </Button>
  //             </div> 
  //           ))}
  //         </Grid>

  //         <Button onClick={signOut}>
  //           Sign Out
  //         </Button>
  //       </div>
  //     )}
  //   </Authenticator>
  // );


  return (
    <Authenticator>
      {({ signOut }) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="70%"
          margin="0 auto"
        >
          <Heading level={1}>My Notes App</Heading>
          <View as="form" margin="3rem 0" onSubmit={(e) => createNote(new FormData(e.target))}>
            <Flex
              direction="column"
              justifyContent="center"
              gap="2rem"
              padding="2rem"
            >
              <TextField
                name="name"
                placeholder="Note Name"
                label="Note Name"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="description"
                placeholder="Note Description"
                label="Note Description"
                labelHidden
                variation="quiet"
                required
              />
              <View
                name="image"
                as="input"
                type="file"
                alignSelf={"end"}
                accept="image/png, image/jpeg"
              />

              <Button type="submit" variation="primary">
                Create Note
              </Button>
            </Flex>
          </View>
          <Divider />
          <Heading level={2}>Current Notes</Heading>
          <Grid
            margin="3rem 0"
            autoFlow="column"
            justifyContent="center"
            gap="2rem"
            alignContent="center"
          >
            {notes.map((note) => (
              <Flex
                key={note.id || note.name}
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="2rem"
                border="1px solid #ccc"
                padding="2rem"
                borderRadius="5%"
                className="box"
              >
                <View>
                  <Heading level={3}>{note.name}</Heading>
                </View>
                <Text fontStyle="italic">{note.description}</Text>
                {note.image && (
                  <Image
                    src={note.image}
                    alt={`visual aid for ${note.name}`}
                    style={{ width: 400 }}
                  />
                )}
                <Button
                  variation="destructive"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete note
                </Button>
              </Flex>
            ))}
          </Grid>
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      )}
    </Authenticator>
  );
}

