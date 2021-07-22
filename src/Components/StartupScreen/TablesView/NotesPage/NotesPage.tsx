import React, { ReactNode, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  colors,
  Theme,
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import NotesComponent from "../../../StartupScreen/TablesView/NotesPage/NotesComponent/NotesComponent";
import { fetchCollection, updateCollection } from "../../../fetch";
import { NoteDataInterface, OptionInterface } from "../../../interfaces";
import { globalContext } from "../../../../AppContext";

const defaultText = `May 2021 Investor Updates
In this section, startups can share updates regaring the growth, sales, new partnerships, hires, and the other things going on at the company.

Product Updates
Write about product update 1.
Write about Product update 2.

Growth Updates
Write about growth update 1.
Write about growth update 2.

Sales and new partnerships Updates
Write about sales updates.
Write about partnership updates.

New Hire Updates
Write about full-time hires updates.
Write about ESPOs Update.

Other Updates/Conclusion
Over all the summary for the month in brief and any points to share can be done as a conclusion in this paragraph. `;

export const extractNote = (
  data: NoteDataInterface[],
  currentMonth: string
) => {
  const note = data.filter((data) => {
    if (monthsArray[data.month - 1] === currentMonth) return true;
    else return false;
  });
  return note;
};

const useStyles = makeStyles({
  page: {
    marginTop: "2rem",
    width: "100%",
  },
});

const monthsArray = [
  "janurary",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

interface PropsInterface {
  selectedStartup: OptionInterface;
}

const NotesPage = (props: PropsInterface) => {
  const appContext = useContext(globalContext);
  const theme = useTheme();
  const classes = useStyles();
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear().toString()
  );
  const [currentMonth, setCurrentMonth] = React.useState(
    monthsArray[new Date().getMonth()]
  );

  const [noteData, setnoteData] = React.useState<NoteDataInterface | null>(
    null
  );

  const getData = () => {
    fetchCollection(
      appContext?.apiRoute,
      appContext?.token,
      "notes",
      currentYear,
      props.selectedStartup.accessor
    )
      .then((res) => {
        const note = extractNote(res.data, currentMonth);
        if (note.length) {
          setnoteData(note[0]);
        } else {
          console.log("note not avaliable, init empty note");
          setnoteData({
            note_name: "Investor Data",
            month: new Date().getMonth() + 1,
            note_data: [
              {
                type: "paragraph",
                children: [{ text: "No Data Avaliable" }],
              },
            ],
            email_status: false,
            investor_view: false,
            last_emailed: "",
            last_updated: "",
            year: 2021,
            startup_id: props.selectedStartup.accessor,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, [currentYear, currentMonth, props.selectedStartup]);

  const notesConfig = [
    {
      Header: "Investor Update",
      accessor: "Hello",
    },
  ];

  const updateData = (noteData: NoteDataInterface) => {
    let num;
    monthsArray.find((m, i, j) => {
      if (m === currentMonth) num = i + 1;
    });
    let data = {
      ...noteData,
      month: num,
    };
    updateCollection(appContext?.apiRoute, appContext?.token, "notes", [data])
      .then((res) => {
        getData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.page}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {noteData ? (
            <NotesComponent
              currentYear={currentYear}
              setCurrentYear={(year: string) => setCurrentYear(year)}
              currentMonth={currentMonth}
              setCurrentMonth={(month: string) => setCurrentMonth(month)}
              setNoteData={(val: NoteDataInterface) => setnoteData(val)}
              noteData={noteData}
              saveChangeHandler={(val: NoteDataInterface) => {
                updateData(val);
              }}
              preview={false}
            />
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default NotesPage;
