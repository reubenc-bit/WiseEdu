import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Play, Save, Download, Code, Blocks } from "lucide-react";

interface CodingEnvironmentProps {
  projectId?: string;
  initialCode?: string;
  language?: 'blocks' | 'python' | 'javascript';
}

export function CodingEnvironment({ 
  projectId, 
  initialCode = '', 
  language = 'blocks' 
}: CodingEnvironmentProps) {
  const [currentTab, setCurrentTab] = useState(language);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // TODO: Implement actual code execution
    // For now, simulate code execution
    setOutput('Running code...\nHello, World!\nCode executed successfully!');
    
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const handleSaveProject = async () => {
    // TODO: Implement project saving to database
    console.log('Saving project:', { projectId, code, language: currentTab });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]" data-testid="coding-environment">
      {/* Code Editor */}
      <Card className="flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Code Editor</span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSaveProject}
                data-testid="button-save-project"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                data-testid="button-download-project"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blocks" data-testid="tab-blocks">
                <Blocks className="w-4 h-4 mr-2" />
                Blocks
              </TabsTrigger>
              <TabsTrigger value="python" data-testid="tab-python">
                <Code className="w-4 h-4 mr-2" />
                Python
              </TabsTrigger>
              <TabsTrigger value="javascript" data-testid="tab-javascript">
                <Code className="w-4 h-4 mr-2" />
                JavaScript
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="blocks" className="h-full mt-0">
              <div className="h-full bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Blocks className="w-16 h-16 mx-auto mb-4" />
                  <p>Visual Block Editor</p>
                  <p className="text-sm">Drag and drop blocks to create code</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="python" className="h-full mt-0">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="# Write your Python code here
print('Hello, World!')

# Create a simple function
def greet(name):
    return f'Hello, {name}!'

# Call the function
message = greet('CodewiseHub')
print(message)"
                className="h-full resize-none font-mono text-sm"
                data-testid="textarea-python-code"
              />
            </TabsContent>
            
            <TabsContent value="javascript" className="h-full mt-0">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Write your JavaScript code here
console.log('Hello, World!');

// Create a simple function
function greet(name) {
    return `Hello, ${name}!`;
}

// Call the function
const message = greet('CodewiseHub');
console.log(message);"
                className="h-full resize-none font-mono text-sm"
                data-testid="textarea-javascript-code"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Output and Controls */}
      <Card className="flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Output</span>
            <Button 
              onClick={handleRunCode} 
              disabled={isRunning}
              data-testid="button-run-code"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-full bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-auto">
            <pre className="whitespace-pre-wrap" data-testid="text-code-output">
              {output || 'Click "Run Code" to see output here...'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
