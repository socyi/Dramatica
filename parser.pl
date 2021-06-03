# use utf8;

# my $filename = 'autoParse.txt';

# open(FH, '<', $filename) or die $!;
# $pendingline = '';
# $pendingparagraphnum = 0;

# while(<FH>){

#     $currentline=$_;
#     print "$currentline";
# }



#!/usr/bin/perl
$currentwork=$ARGV[0];
print "GreekWorkID = $ARGV[0]\n";

my $src = '2007_Bellies_Romeo.txt';
my $des = 'new'.$src;


use DBI;

my $driver = "mysql"; 
my $database = "dramaticadb";
my $dsn = "DBI:$driver:database=$database";
my $userid = "root";
my $password = "password";

my $dbh = DBI->connect($dsn, $userid, $password, {mysql_enable_utf8 => 1}) or die $DBI::errstr;

@chars;
$counter=0;
$temp=0;

my $sth = $dbh->prepare("SELECT Alias
                        FROM charactersgreek 
                        where GreekWorkID='$currentwork'
                        ");
$sth->execute() or die $DBI::errstr;
print "Number of rows found :" + $sth->rows . "\n";

while ( @charss = $sth->fetchrow_array()) {
   ($temp)=@charss;   
   $chars[$counter]=$temp;
   $counter++;  
}
$sth->finish();

my $sth = $dbh->prepare("SELECT Alias2
                        FROM charactersgreek 
                        where GreekWorkID='$currentwork'
                        ");
$sth->execute() or die $DBI::errstr;
print "Number of rows found :" + $sth->rows . "\n";

while ( @charss = $sth->fetchrow_array()) {
   ($temp)=@charss;
   $chars[$counter]=$temp;
   $counter++;
  
}
$sth->finish();

# open source file for reading
open(SRC,"<:encoding(UTF-8)",$src) or die $!;

# open destination file for writing
open(DES,">:encoding(UTF-8)",$des) or die $!;

print("copying content from $src to $des\n");

  $tempChar=0;
  $flag3=0;
while(<SRC>){
    $line='';
    $line2='';
    $line3='';
    $line=$_;

    if (/^\s*$/){
       
    }

    else{
      
        $flag=0;
        $flag2=0;
        $line2=$line; 
        $line2 =~ s/^\s+//;
        $line2 =~ s/\(([0-9]+)\)//g;
        $line2 =~ s/ΠΡΑΞΙΣ\)/Chapter/g;
        
    
        # $line2 =~ s/ +/ /;
        # $character = substr($line2, 0, index($line2, ' '));
        $first = substr $line2, 0, 1;
        #if stage direction 
        if ($first eq '('){
            $flag=1;
            $line2='%xxx. '.$line2;  
            print DES $line2;	
        }
        else{
            @spl = split(' ', $line2, 2);
            $character=$spl[0];
            $restLine=$spl[1];
            for my $i (@chars){
                if ($i."." eq $character){
                    $line2='%'.$line2;
                    $flag=1;
                    last;
                }
                if ($i."," eq $character){
                    $line2='%'.$line2;
                    $flag=1;
                    last;
                }
                if ($i eq $character){
                    # For some works that char name is on a seperate line with the text 
                    if ($restLine eq ""){
                        $flag2=1;
                        $flag=1;
                        $tempChar=$character;
                        last;
                        #if char lines follow char name
                    }else {
                        $line2='%'.$character.'. '.$restLine;
                        $flag=1;
                        last;
                    }
                    # comment out below lines
                    $line2='%'.$character.'. '.$restLine;
                    $flag=1;
                    print DES $line2;	
                    last;
                } 
            }
        }
        $character='';
        
        #if previous line had just a char name append current line to that name
        if ($flag3 eq 1){
            $line2='%'.$tempChar.'. '.$line2;
            $tempChar=0;
            $flag=1;
            $flag3=0;
            print DES $line2;	
        }
        #lines added to previous character
        if ($flag eq 0){
            $line2='^'.$line2;  
            print DES $line2;	
        }
      
       #if current line has only character name set up next line
        if ($flag2 eq 1){
            $flag3=1;
            $flag2=0;
        }

    
    }
}

# always close the filehandles
close(SRC);
close(DES);

print "\nFile content copied successfully!\n";