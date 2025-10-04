#!/bin/bash

echo "🚀 Launching Airdrop Hunter Website..."
echo ""
echo "📱 Available URLs:"
echo "   Main Application: http://localhost:3000"
echo "   Test Page:        http://localhost:3000/test"
echo "   Health Check:     http://localhost:3000/api/health"
echo ""
echo "🌐 Opening browser..."
echo ""

# Detect the operating system
case "$(uname -s)" in
    Darwin*)    # macOS
        open http://localhost:3000
        ;;
    Linux*)     # Linux
        xdg-open http://localhost:3000
        ;;
    CYGWIN*|MINGW*|MSYS*) # Windows
        start http://localhost:3000
        ;;
    *)
        echo "Please manually open: http://localhost:3000"
        ;;
esac

echo "✅ Browser opened! The development server is running."
echo ""
echo "📋 Quick Testing Checklist:"
echo "   1. Test main navigation menu"
echo "   2. Try search and filter functionality"
echo "   3. Check responsive design (resize browser)"
echo "   4. Visit test page for component showcase"
echo "   5. Verify API health at /api/health"
echo ""
echo "📄 Full UI/UX test report: UI-UX-TEST-REPORT.md"
echo ""
echo "Press Ctrl+C to stop the development server."