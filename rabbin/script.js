/// Enable Wizard
$('#rabinWizard').smartWizard({
    selected: 0, // Initial selected step, 0 = first step
    autoAdjustHeight: false, 
    keyNavigation: false, // enable/disable key navigation.
    lang : { // Language Variable
        next : 'Selanjutnya',
        previous : 'Sebelumnya'
    },
    useURLhash: false, // Enable selection of the step based on url hash
    showStepURLhash: false, // Show url hash based on step
    toolbarSettings: {
        toolbarPosition: 'bottom', // none, top, bottom, both
        toolbarButtonPosition: 'right', // left, right
        showNextButton: true, // show/hide a Next button
        showPreviousButton: true, // show/hide a Previous button
        toolbarExtraButtons: [
                        $('<button></button>').text('Finish')
                                .addClass('btn btn-info sw-btn-fin')
                                .on('click', function(){ 
                                    swal('Terima Kasih.', 'Terima Kasih Telah Menggunakan Web ini', 'success');                           
                                    location.reload();
                                })
        ], 
    },
    anchorSettings: {
        anchorClickable: true, // Enable/Disable anchor navigation
        enableAllAnchors: false, // Activates all anchors clickable all times
        markDoneStep: true, // add done css
        enableAnchorOnDoneStep: true, // Enable/Disable the done steps navigation
        removeDoneStepOnNavigateBack: true, // While navigate back done step after active step will be cleared
    },          
    theme: 'dots',
    transitionEffect: 'fade', // Effect on navigation, none/slide/fade
    transitionSpeed: '400'
});


$('.sw-btn-fin').hide(); // Hidden Finish Button

// Enable Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$('#rabinWizard').on('showStep', function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
    if(stepPosition != 'final')
      {
        $('.sw-btn-fin').hide();
        $('.sw-btn-next').show();
      }
      else
      {
        $('.sw-btn-next').hide();
        $('.sw-btn-fin').show(); // Show Finish Button
      }
});

// Zero Pad
function zeroPad(num, places) {
    var zero = places - num.toString(2).length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

// Quick Exponentiation Mod Algorithm
function power(a, b, m)
{
    var res = 1;
    a = a % m;
    while(b > 0)
    {
        if(b & 1)
            res = (res * a) % m;
        b = b >> 1;
        a = (a*a) % m;
    }
    return res;
}

// Primarity tester
function isPrime(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
    if (n%2==0) return (n==2);
    if (n%3==0) return (n==3);
    var m=Math.sqrt(n);
    for (var i=5;i<=m;i+=6) {
     if (n%i==0)     return false;
     if (n%(i+2)==0) return false;
    }
    return true;
   }

// EEA
function eea(a, b) {
    var g0 = parseInt(b), g1 = parseInt(a), v0 = 0, v1 = 1;
    while(g1 != 0)
    {
        y = Math.floor(g0/g1);
        g2 = g0 - y * g1;
        g0 = g1;
        g1 = g2;
        v2 = v0 - y * v1;
        v0 = v1;
        v1 = v2;
    }
    if(v0 >= 0) return v0;
    else return v0 + parseInt(b);
}

// Otomatis Hasilkan Nilai N
$('#p,#q').keyup(function(){
    $('#n').val($('#p').val() * $('#q').val());
})

// Verifikasi p dan q prima
$('#rabinWizard').on('leaveStep', function(e, anchor, stepNumber, stepDirection) {
    if(stepNumber === 1)
      {
        var p = parseInt($('#p').val());
        var q = parseInt($('#q').val());
        if(stepDirection === 'forward')
        {
          var primeP = isPrime(p);
          var primeQ = isPrime(q);
          if((primeP && primeQ) && (((p+1) % 4 == 0) && ((q+1) % 4 == 0))) return true;
          else 
          {
            if(!primeP && primeQ) swal("Nilai P Bukan Prima", "Pastikan P adalah Bilangan Prima", "error");
            else if(primeP && !primeQ) swal("Nilai Q Bukan Prima", "Pastikan Q adalah Bilangan Prima", "error");
            else if(!primeP && !primeQ) swal("Nilai P dan Q Bukan Prima", "Pastikan P dan Q adalah Bilangan Prima", "error");
            else if(((p+1) % 4 != 0) && ((q+1) % 4 == 0)) swal("Nilai P Tidak Valid", "Nilai P harus bernai 0, jika (P+1) mod 4", "error");
            else if(((p+1) % 4 != 0) && ((p+1) % 4 == 0)) swal("Nilai Q Tidak Valid", "Nilai Q harus bernai 0, jika (Q+1) mod 4", "error");
            else if(((p+1) % 4 != 0) && ((p+1) % 4 != 0)) swal("Nilai P dan Q Tidak Valid", "Nilai P dan Q harus bernai 0, jika (P (atau) Q+1) mod 4", "error");
            return false;
          }
        }        
      }
      else return true;
});

// Penamaan Kolom
function DupKey(name, chara, asciiChr, chrBin, dupBin, des)
{
    this.name = name;
    this.chara = chara;
    this.asciiChr = asciiChr;
    this.chrBin = chrBin;
    this.dupBin = dupBin;
    this.des = des;
}

function Chipper(chara, miDec, Ch)
{
    this.chara = chara;
    this.miDec = miDec;
    this.Ch = Ch;
}

function Decrypt(chara, nilaiChipper, r, s, x, y, x2, y2, real, char)
{
    this.chara = chara;
    this.nilaiChipper = nilaiChipper;
    this.r = r;
    this.s = s;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.real = real;
    this.char = char;
}

// Declare DataTable
function encryptTable()
{
    duplicateData = getDuplication(getPlainText());
    chipperData = getChipper(duplicateData);
    duplicate = $('#dt_char').DataTable({
        "processing" : false,
        "serverSide" : false,
        "ordering" : false,
        "searching" : false,
        "bLengthChange": false,
        "info" : false,
        "paging" : false,
        "data" : duplicateData,
        "columns" : [
            {"data" : "name"},
            {"data" : 'chara'},
            {"data" : 'asciiChr'},
            {"data" : 'chrBin'},
            {"data" : 'dupBin'},
            {"data" : 'des'}
        ]
    });
    chipper = $('#dt_chipper').DataTable({
        "processing" : false,
        "serverSide" : false,
        "ordering" : false,
        "searching" : false,
        "bLengthChange": false,
        "info" : false,
        "paging" : false,
        "data" : chipperData,
        "columns" : [
            {"data" : 'chara'},
            {"data" : 'miDec'},
            {"data" : 'Ch'}
        ]
    })
}

function decrypt(a, b)
{
    rootSquareData = getRootSquare(a, b);
    decrpt = $('#dt_decrypt').DataTable({
        "processing" : false,
        "serverSide" : false,
        "ordering" : false,
        "searching" : false,
        "bLengthChange": false,
        "info" : false,
        "paging" : false,
        "data" : rootSquareData,
        "columns" : [
            {"data" : "chara"},
            {"data" : 'nilaiChipper'},
            {"data" : 'r'},
            {"data" : 's'},
            {"data" : 'x'},
            {"data" : 'y'},
            {"data" : 'x2'},
            {"data" : 'y2'},
            {"data" : 'real'},
            {"data" : 'char'}
        ]
    });
}


// Duplikasi PlainText 
function getDuplication(plainText)
{
    var chara = (plainText.toString()).split("");
    var data = [];
    for(var i = 0; i < chara.length; i++)
    {
        var name = 'M'+(i+1);
        var ascii = chara[i].charCodeAt();
        var binAscii = zeroPad(ascii.toString(2), 8);
        var duplicate = binAscii + binAscii;
        var des = parseInt(duplicate, 2);
        data.push(new DupKey(name, chara[i], ascii, binAscii, duplicate, des));
    }
    return data;
}

// Get Chipper Result
var chipperStorage = [] // Simpan Nilai Chipper
function getChipper(data)
{
    var decDup = getDecDup(data);
    var data = [];
    for(var i = 0; i < decDup.length; i++)
    {
        var name = 'C'+(i+1);
        var mi = decDup[i];
        var chip = (mi*mi) % $('#n').val();
        data.push(new Chipper(name, mi, chip));
        chipperStorage.push(chip);
    }
    return data;
}

// Get Root Square
function getRootSquare(a, b)
{
    var p = parseInt($('#pDec').val());
    var q = parseInt($('#qDec').val());
    var n = p*q;
    var data = [];
    var res = "Not Found";
    var char = '-'
    for(var i = 0; i < chipperStorage.length; i++)
    {
        var chara = 'C'+(i+1);
        var r = power(chipperStorage[i], Math.floor((p+1)/4), p);
        var s = power(chipperStorage[i], Math.floor((q+1)/4), q);
        var x = Math.abs(((a*p*s) + (b*q*r)) % n);
        var y = Math.abs(((a*p*s) - (b*q*r)) % n);
        var x2 = n-x;
        var y2 = n-y;
        if(originalSR(x)) res = "Xi";
        else if(originalSR(x2)) res = "-Xi";
        else if(originalSR(y)) res = "Yi";
        else if(originalSR(y2)) res = "-Yi";
        if(res != "Not Found")
        {
            if(res === "Xi") char = toChar(x);
            else if(res === "-Xi") char = toChar(x2);
            else if(res === "Yi") char = toChar(y);
            else if(res === "-Yi") char = toChar(y2);
        }
        data.push(new Decrypt(chara, chipperStorage[i], r, s, x, y, x2, y2, res, char));
        $('#trueMessage').val($('#trueMessage').val() + char);
    }
    return data;
}

// Find Original Square Root
function originalSR(number)
{
    if(number < 0) number *= -1;
    var binary = number.toString(2);
    if(binary.length > 16) return false;
    else if(binary.length < 16) binary = zeroPad(binary, 16);
    binary = binary.match(/.{1,8}/g);
    if(binary[0] == binary[1]) return true;
    else return false;
}

// Conver to char
function toChar(num)
{
    if(num < 0) num *= -1;
    return String.fromCharCode(num % 128);
}

// Get Decimal Binary Duplication
function getDecDup(data)
{
    var dec = [];
    for(var i = 0; i < data.length; i++)
    {
        dec.push(data[i].des);
    }
    return dec;
}

// Get PlainText
function getPlainText()
{
    return $('#plainText').val();
}

// Enkripsi
var tableFirstInisialized = 0;
$('#encrypt').click(function(){
    chipperStorage = []; // Reset Chipper Array
    if(tableFirstInisialized == 0)
    {   encryptTable();
        tableFirstInisialized = 1;
    }
        
    else
    {
        duplicate.clear().destroy();
        chipper.clear().destroy();
        encryptTable();
    }
})

// Dekripsi
var tableDecInisialized = 0;
$('#decrypt').click(function(){
    var a, b;
    if(!checkPQ($('#pDec').val(), $('#qDec').val())) swal('Nilai P atau Q tidak sama', 'Pastikan nilai P dan Q sama dengan nilai P dan Q di bagian pembentukan kunci', 'error');
    else
    {
        $('#trueMessage').val('');
        a = eea($('#pDec').val(), $('#qDec').val());
        $('#aDec').val(a);
        b = eea($('#qDec').val(), $('#pDec').val());
        $('#bDec').val(b);
        if(tableDecInisialized == 0)
        {
            decrypt(a,b);
            tableDecInisialized = 1;
        }
        else
        {
            decrpt.clear().destroy();
            decrypt(a,b);
        }
    }    
})

// Cek Nilai P dan Q Decrypt dengan Key Generator sama
function checkPQ(p, q)
{
    pOld = $('#p').val();
    qOld = $('#q').val();
    if((p == pOld) && (q == qOld)) return true;
    else return false;
}