###########################################################################
# Shakespeare text parser
###########################################################################
# Eric M. Johnson
# July 12, 2003
#
# January 30, 2004: modified to use new database schema
#
# "Sections" = Acts
# "Chapters" = Scenes
###########################################################################


# begin timing the script


###########################################################################
# subroutine to add lines to database
###########################################################################



sub linewrite {

    $writepara = $_[0];
    $writeparanum = $_[1];
    $writeparatype = $_[2];
    $writeparasection = $_[3];
    $writeparachapter = $_[4];
  

    # identify the line type
    if ($writeparatype eq '$') { $writeparatype = 's' } # stage directions
    if ($writeparatype eq '%') { $writeparatype = 'b' } # blank verse -- parser can't tell difference between blank and metered verse
    if ($writeparatype eq '^') { $writeparatype = 'b' } # blank verse -- parser can't tell difference between blank and metered verse
    
    # remove leading ASCII characters for stage directions, character lines, continued lines

    $writepara =~ s/[\$\%\^]//g;
    # print "$writepara";
   
     # figure out who the character is, remove his name from the line
    ($charid, $writepara, $speechcount) = charfinder($writepara, $writeparatype);
    
     # # modify apostrophes to make it acceptable to SQL


    $writepara =~ s/\'/\'\'/g;
   

    # character count
    $charcount = length($writepara);

    $dbcharline = 0;

    if ($charid ne 'xxx'){
        $charlinecount ++;
        $dbcharline = $charlinecount;

    }


#this is for both
#    if ($charlinecount eq 700){
#           $charlinecount ++;
#         $dbcharline = $charlinecount;
#     }

#  #FOR VIKELAS COMMENTED OUT
#     if ($charlinecount eq 349){
#         $upper = 363-349;
#         @bounds = (1..$upper);
#         for $i (@bounds){
#             $charlinecount;
#             $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
#             "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
#             $sqlstatement2->execute() or die $DBI::errstr;
#             $charlinecount++;
#             $dbcharline = $charlinecount;
#         }
#     }

    
#     if ($charlinecount eq 378){
#         $upper = 380-378;
#         @bounds = (1..$upper);
#         for $i (@bounds){
#             $charlinecount;
#             $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
#             "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
#             $sqlstatement2->execute() or die $DBI::errstr;
#             $charlinecount++;
#             $dbcharline = $charlinecount;
#         }
#     }

#     if ($charlinecount eq 386){
#         $upper = 387-386;
#         @bounds = (1..$upper);
#         for $i (@bounds){
#             $charlinecount;
#             $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
#             "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
#             $sqlstatement2->execute() or die $DBI::errstr;
#             $charlinecount++;
#             $dbcharline = $charlinecount;
#         }
#     }


#     if ($charlinecount eq 713){
#     $upper = 714-713;
#     @bounds = (1..$upper);
#         for $i (@bounds){
#             $charlinecount;
#             $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
#             "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
#             $sqlstatement2->execute() or die $DBI::errstr;
#             $charlinecount++;
#             $dbcharline = $charlinecount;
#         }
#     }

#        if ($charlinecount eq 742){
#     $upper = 743-742;
#     @bounds = (1..$upper);
#         for $i (@bounds){
#             $charlinecount;
#             $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
#             "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
#             $sqlstatement2->execute() or die $DBI::errstr;
#             $charlinecount++;
#             $dbcharline = $charlinecount;
#         }
#     }



#FOR BELLIES
    # if ($charlinecount eq 36){
    #     $upper = 37-36;
    #     @bounds = (1..$upper);
    #     for $i (@bounds){
    #         $charlinecount;
    #         $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
    #         "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
    #         $sqlstatement2->execute() or die $DBI::errstr;
    #         $charlinecount++;
    #         $dbcharline = $charlinecount;
    #     }
    # }

    # if ($charlinecount eq 345){
    #     $upper = 363-345;
    #     @bounds = (1..$upper);
    #     for $i (@bounds){
    #         $charlinecount;
    #         $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
    #         "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
    #         $sqlstatement2->execute() or die $DBI::errstr;
    #         $charlinecount++;
    #         $dbcharline = $charlinecount;
    #     }
    # }


    # if ($charlinecount eq 364){
    #     $upper = 365-364;
    #     @bounds = (1..$upper);
    #     for $i (@bounds){
    #         $charlinecount;
    #         $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
    #         "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
    #         $sqlstatement2->execute() or die $DBI::errstr;
    #         $charlinecount++;
    #         $dbcharline = $charlinecount;
    #     }
    # }

    # if ($charlinecount eq 738){
    #     $upper = 752-738;
    #     @bounds = (1..$upper);
    #     for $i (@bounds){
    #         $charlinecount;
    #         $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
    #         "VALUES ('$currentwork', 'blank', '-',0, '$writeparatype', $writeparasection, $writeparachapter,0,$dbcharline)");
    #         $sqlstatement2->execute() or die $DBI::errstr;
    #         $charlinecount++;
    #         $dbcharline = $charlinecount;
    #     }
    # }


    # print "$writepara";
    # # write a new line to the db
    $sqlstatement2 = $db->prepare("INSERT INTO paragraphsgreek (GreekWorkID, GreekCharID, PlainText, ParagraphNum, ParagraphType, Section, Chapter, CharCount,CharLine) " .
    "VALUES ('$currentwork', '$charid', '$writepara', $writeparanum, '$writeparatype', $writeparasection, $writeparachapter, $charcount,$dbcharline)");
    $sqlstatement2->execute() or die $DBI::errstr;
    #     my(@err) = $db->Error;
    #     print "sql() ERROR\n";
    #     print "@err\n";   
    #     die "\nDied while trying to write line $writeparanum\n$sqlstatement\n";   
        





    # # increment the speech count and store it
    # $speechcount++;
    # $sqlstatement = "UPDATE Characters
    # SET SpeechCount=$speechcount
    # WHERE CharID = '$charid'";
    # #print "$sqlstatement\n\n";
    # if ($db->sql($sqlstatement)) {
    #     my(@err) = $db->Error;
    #     print "sql() ERROR\n";
    #     print "@err\n";
    #     die "\nDied while trying to update the speech count on line $writeparanum\n$sqlstatement\n";
    # }
    $totalparagraphs++;
}

###########################################################################
# subroutine to figure out whose line it is, anyway
###########################################################################
sub charfinder {
    $tempcharline = $_[0];
    $tempcharparagraphtype = $_[1];
   
    if ($tempcharparagraphtype ne 's') {
        # get the chartemp value
        $pdloc = index($tempcharline, ".");
        $chartemp = substr($tempcharline, 0, $pdloc);
        $tempcharline = substr($tempcharline, $pdloc + 2);

        $charid = '';
        # print "$chartemp";
        
        $chartemp =~ s/^\s+|\s+$//g;
        $chartemp =~ s/\'/\'\'/g;
        # get character info from db
        $getcharinfo =$db->prepare( "SELECT *
        FROM charactersgreek
        WHERE GreekWorkID
        LIKE '%$currentwork%'
        AND Alias='$chartemp' 
        OR Alias2='$chartemp'");
        $getcharinfo->execute() or die $DBI::errstr;

        
        # print "\n$chartemp";
        while (my @row = $getcharinfo->fetchrow_array()) {
            $charid = $row[0];
            $charname = $row[1];
            $abbrev = $row[2];
            $speechcount = $row[3];
            # print "\n$charid $charname $abbrev $speechcount";
        }
            
           
    }

    if ($chartemp eq 'xxx'){
        $charid='xxx';
    }

    # tell it who it is, otherwise return an error
    if ($charid) {
        # print "[$textlinecount]CharID: $charid\n";
    }
    else
    {
        print "[$textlinecount]Character not identified\n";
        $noid++;
    }
    #return it?
    # $tempcharname = 
    return $charid, $tempcharline, $speechcount;
}

###########################################################################
# subroutine to add new chapter
###########################################################################

sub addchapter {
    $newsection = $_[0];
    $newchapter = $_[1];
    $description = $_[2];
    $currentwork = $_[3];
    $db = $_[4];

    # make apostrophes acceptable to SQL
    # $description =~ s/\'/\&\#8217\;/g;
    $description=~ s/\'/\'\'/g;
    # write new chapter to the db
    $sqlstatement = $db->prepare("INSERT INTO chaptersgreek(GreekWorkID, Section, Chapter, Description) " .
    "VALUES ('$currentwork', $newsection, $newchapter, '$description')");
    #print "$sqlstatement\n\n";
    $sqlstatement->execute() or die $DBI::errstr;
    # while (my @row = $getworkinfo->fetchrow_array()) {
    #     ($title) = @row;
    # }
        
}

###########################################################################
# set up database connections
###########################################################################
#use strict;
use DBI;


my $driver = "mysql"; 
my $database = "dramaticadb";
my $dsn = "DBI:$driver:database=$database";
my $userid = "root";
my $password = "password";


my $db = DBI->connect($dsn, $userid, $password, {mysql_enable_utf8 => 1}) or die $DBI::errstr;



###########################################################################
# variable population
###########################################################################

# populate all the Works if they are not specified on the command line

$currentwork=$ARGV[0];
$file=$ARGV[1];
print "GreekWorkID = $ARGV[0]\n";


#     # remove the speech counts
#     $sqlstatement = "UPDATE Characters
#     SET SpeechCount=0";
#     #print "$sqlstatement\n\n";
#     if ($db->sql($sqlstatement)) {
#         my(@err) = $db->Error;
#         print "sql() ERROR\n";
#         print "@err\n";
#         die "\nDied while trying to erase the speech counts.\n";
#     }



# start with Section 0, Chapter 1
$currentsection = 0;
$currentchapter = 0;

# flag for whether a line should be appended to a previous one
$appline = 0;

###########################################################################
# Main body of program
# Loop through each line, and parse according to what kind of line it is
###########################################################################



# reset counter variables
$noid = 0;
$totalparagraphs = 0;
$changelines = 0;
$charlinecount = 0;
$continuedlines = 0;
$textlinecount = 1;
$workwordcount = 0;
$tempcharname = '';


# get current work's title
$getworkinfo = $db->prepare("SELECT Title
FROM worksgreek
WHERE GreekWorkID='$currentwork'");
$getworkinfo->execute() or die $DBI::errstr;
while (my @row = $getworkinfo->fetchrow_array()) {
    ($title) = @row;
}


# delete old rows in Paragraphs table
# $sqlstatement = "DELETE * FROM Paragraphs WHERE WorkID='$currentwork'";
# print "\n------------------------------------------------\n";
# print uc($worktitle);
# print "\n------------------------------------------------\n";

# if ($db->sql($sqlstatement)) {
#     my(@err) = $db->Error;
#     print "sql() ERROR\n";
#     print "@err\n";
#     die
# }

# # delete old rows in Chapters for this play
# $sqlstatement = "DELETE * FROM Chapters WHERE WorkID='$currentwork'";
# if ($db->sql($sqlstatement)) {
#     my(@err) = $db->Error;
#     print "sql() ERROR\n";
#     print "@err\n";
#     die
# }


my $filename = $file;

open(FH, '<', $filename) or die $!;
$pendingline = '';
$pendingparagraphnum = 0;

# delete older records for easier bugfixing
$sqlstatement = $db->prepare("DELETE FROM paragraphsgreek where GreekWorkID='$currentwork'");
$sqlstatement->execute() or die $DBI::errstr;

$sqlstatement = $db->prepare("DELETE FROM chaptersgreek where GreekWorkID='$currentwork'");
$sqlstatement->execute() or die $DBI::errstr;
while(<FH>){

    $currentline=$_;
  
    # print "$currentline";

    # line we're working on, if a character's line goes more than two lines
 

    $addline = 1;

    # get the first byte of the line, to determine what kind of line it is
    $linekind = substr($currentline, 0, 1);
    #print "$linekind \n";


    # stage direction lines
    if ($linekind eq '$') {
        $changelines++;

        # is this a chapter or act change?
        if (substr($currentline, 1, 7) eq "SECTION") {
            $currentsection = substr($currentline, 9, 1);
            # drop this line because it isn't needed
            $addline = 0;
        }
        if (substr($currentline, 1, 7) eq "CHAPTER") {
            # find where the period is, which is the indicator of where the scene number ends
            $periodpos = index $currentline, ".", 7;

            # figure out how many digits there are in the chapter
            $numsize = $periodpos - 9;

            $currentchapter = substr($currentline, 9, $numsize);
        

            # extract setting info, chomp the paragraph break
            $description = substr($currentline, 11+$numsize, length($currentline)-13);
            
            # add the chapter to the db
            addchapter($currentsection, $currentchapter, $description, $currentwork, $db);

            # drop this line because it isn't needed
            $addline = 0;
        }
        
        if ($addline eq 1) {
            
            # write current line to database unless this is a section or chapter indication line
            if ($appline ne 0) {
                linewrite($currentline, $textlinecount, $linekind, $currentsection, $currentchapter);
            }
            else
            {
                # write pending line to database
                linewrite($pendingline, $pendingparagraphnum, $pendinglinekind, $pendingsection, $pendingchapter);

                # clear pending line
                $pendingline = '';
                $pendingparagraphnum = 0;
                $pendinglinekind = '';
                $pendingsection = 0;
                $pendingchapter = 0;

                # write new line to database
                linewrite($pendingline, $textlinecount, $linekind, $currentsection, $currentchapter);
            }
            $appline = 0;
        }

    }

    #STAGE DIRECTIONS
    if ($linekind eq '&') {
        $continuedlines++;
        $pendingline = "$pendingline\[p\]$currentline";
       
    }





    #Beginning of character lines

    if ($linekind eq '%') {
        
        
        if ($appline ne 0) {
            #print "\n! $pendingline , $pendingparagraphnum, $pendinglinekind, $pendingsection, $pendingchapter !\n";
            #write pending line to database
            linewrite($pendingline, $pendingparagraphnum, $pendinglinekind, $pendingsection, $pendingchapter);
            

            #clear old line
            $pendingline = '';
            $pendingparagraphnum = 0;
            $pendinglinekind = '';
            $pendingsection = 0;
            $pendingchapter = 0;
        }
        # populate the pending line data with the current line
        $pendingline = $currentline;
        $pendingparagraphnum = $textlinecount;
        $pendinglinekind = $linekind;
        $pendingsection = $currentsection;
        $pendingchapter = $currentchapter;
        $appline = 1;
    }

    if ($linekind eq '^') {
        $continuedlines++;
        $pendingline = "$pendingline\[p\]$currentline";
       
    }
    # add the addline variable, which says whether we should increment the line count
    $textlinecount = $textlinecount + $addline;

#end of file opening !!!! end of while
}
close(FH);

# write last pending line if it's still there
if ($pendingline) {
    #print "\nline = $pendingline\n";
    #write pending line to database
    linewrite($pendingline, $pendingparagraphnum, $pendinglinekind, $pendingsection, $pendingchapter);
    $textlinecount++;
}

print "\nParsing successful!\n";    

# # close the database connection
#$db->Close();

