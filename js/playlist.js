window.onload=function(){
		new Controls({
			songs:[ {
                        src:'audio/intro.mp3',
                        name:'player ready intro',
                        author:'none',
                        cover:'img/onair.jpg'
                    },   {
                        src:'https://stream1.radionepal.gov.np/live/',
                        name:'Radio Nepal',
                        author:'am/sw/fm radio',
                        cover:'img/radionepal.png'
                    },            
                    {
                        src:'https://radio-broadcast.ekantipur.com/stream/',
                        name:'Kantipur Fm',
                        author:'91.2 MHZ kathmandu',
                        cover:'https://radio-jcss-cdn.ekantipur.com/images/kfm_logo.png'
                    },
                    {
                        src:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                        name:'Example mp3 sound',
                        author:'soundhelix.com',
                        cover:'https://lilypond.org/pictures/bwv861-lilypond-large.png'
                    },
                    
                ]
		});
	}
