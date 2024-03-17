           /*
            function showContent(contentId) {
            var selectedContent = document.getElementById(contentId + 'Content');
    
            if (selectedContent) {
            selectedContent.scrollIntoView({ behavior: 'smooth' });
                }
            }
            */
            function showContent(contentId) {
                var selectedContent = document.getElementById(contentId + 'Content');
        
                if (selectedContent) {
                
                var currentPosition = window.scrollY;
                var targetPosition = selectedContent.offsetTop;
                var distance = targetPosition - currentPosition;
                var duration = 500;  
        
                var startTime = null;
        
                var scrollStep = function (timestamp) {
                    if (!startTime) startTime = timestamp;
        
                    var progress = timestamp - startTime;
                    var percentage = Math.min(progress / duration, 1);
        
                    window.scrollTo(0, currentPosition + distance * percentage);
        
                    if (percentage < 1) {
                        requestAnimationFrame(scrollStep);
                    } else {
                        window.scrollTo(0, targetPosition);  
                        highlightNavLink(contentId); 
                    }
                };
        
                requestAnimationFrame(scrollStep);
            }
        }

        function highlightNavLink(contentId) {
            var links = document.querySelectorAll('.nav-left-a');
            for (var i = 0; i < links.length; i++) {
                links[i].classList.remove('active');
            }
        
            var currentLink = document.querySelector('a.nav-left-a[onclick="showContent(\'' + contentId + '\')"]');
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
        window.addEventListener('scroll', function() {
            var currentPosition = window.scrollY;
            var navLinks = document.querySelectorAll('.nav-left-a');
            var closestSectionId = null;
            var closestDistance = Infinity;
        
            for (var i = 0; i < navLinks.length; i++) {
                var link = navLinks[i];
                var contentId = link.getAttribute('onclick').match(/\((.*?)\)/)[1].replace(/'/g, '');
                var section = document.getElementById(contentId + 'Content');
    
                if (section) {
                    var sectionTop = section.offsetTop;
                    var distance = Math.abs(sectionTop - currentPosition);
        
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSectionId = contentId;
                    }
                }
            }
            highlightNavLink(closestSectionId);
        });
        
        function highlightNavLink(contentId) {
            var links = document.querySelectorAll('.nav-left-a');
            for (var i = 0; i < links.length; i++) {
                links[i].classList.remove('active');
            }
        
            var currentLink = document.querySelector('a.nav-left-a[onclick*="' + contentId + '"]');
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }

        function toggleImagesVisibility(button) {
            var parentDiv = button.closest('.img-first-stage');
            var images = parentDiv.querySelectorAll('img');
        
            for (var i = 0; i < images.length; i++) {
                images[i].classList.toggle('hidden');
            }
        }


    function telechargerPDF(pdfPath) {
        var link = document.createElement('a');
        link.href = pdfPath;
        link.download = pdfPath.split('/').pop(); 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    document.addEventListener("DOMContentLoaded", function() {
        var imgPoursuiteTele = document.querySelectorAll('.img-poursuite-tele');

        imgPoursuiteTele.forEach(function(imgTele, index) {
            imgTele.addEventListener('click', function() {
                var pdfPath;
                if (index === 0) {
                    pdfPath = 'CV_lettre/Jasmine_AVAKOVA_CV.pdf';
                } else if (index === 1) {
                    pdfPath = 'CV_lettre/lettre.pdf';
                }
                telechargerPDF(pdfPath);
            });
        });
    });


    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    
        document.addEventListener("DOMContentLoaded", function() {
            var pdfCanvases = document.querySelectorAll('.pdf-canvas');
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';
    
            pdfCanvases.forEach(function(canvas, index) {
                var url;
                
                if (index === 0) {
                    url = 'CV_lettre/Jasmine_AVAKOVA_CV.pdf';
                } else if (index === 1) {
                    url = 'CV_lettre/lettre.pdf';
                }
    
                var context = canvas.getContext('2d');
    
                pdfjsLib.getDocument(url).promise.then(function(pdf) {
                    return pdf.getPage(1);
                }).then(function(page) {
                    var scale = 1.5;  
                    var viewport = page.getViewport({ scale: scale });
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
    
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    return page.render(renderContext);
                }).catch(function(reason) {
                    console.error(reason);
                });
            });
        });