import {describe,it,expect,vi,beforeEach} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import Journal from '../Journal';
import JournalEntry from '../JournalEntry';
import {mapJournalEntry} from '../../lib/sanity/journal';
const state=vi.hoisted(()=>({list:{} as any,entry:{} as any}));
vi.mock('../../hooks/useJournal',()=>({useJournal:()=>state.list,useJournalEntry:()=>state.entry}));
const render=(node:React.ReactNode)=>renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>);
beforeEach(()=>{state.list={data:[],refetch:vi.fn()};state.entry={data:null,refetch:vi.fn()};});
describe('Journal reader states',()=>{
 it('shows an honest empty state without sample articles',()=>{expect(render(<Journal/>)).toContain('No entries published yet.');});
 it('shows a retry action on API errors',()=>{state.list.isError=true;const html=render(<Journal/>);expect(html).toContain('Try again');expect(html).not.toContain('No entries published yet.');});
 it('shows loading instead of an empty or missing entry',()=>{state.entry.isPending=true;const html=render(<JournalEntry/>);expect(html).toContain('Loading learning notes');expect(html).not.toContain('Entry not available');});
 it('shows unavailable for an unpublished entry',()=>{expect(render(<JournalEntry/>)).toContain('Entry not available');});
 it('renders highlighted code and tables as escaped, semantic article content',()=>{state.entry.data=mapJournalEntry({slug:'test',title:'My <notes>',notes:[{_key:'c',_type:'codeSnippet',language:'HTML',code:'<script>alert(1)</script>'},{_key:'t',_type:'contentTable',caption:'Pinout',rows:[{_key:'r',cells:['Signal','Pin']},{_key:'r2',cells:['SDA','4']}]}],attachments:[{url:'https://example.com/a.pdf',label:'My PDF'}]});const html=render(<JournalEntry/>);expect(html).toContain('&lt;');expect(html).not.toMatch(/<script(?:\s|>)/);expect(html).toContain('<table');expect(html).toContain('Pinout');expect(html).toContain('SDA');expect(html).toContain('My PDF');});
 it('renders only 12 cards on the first page',()=>{state.list.data=Array.from({length:15},(_,i)=>mapJournalEntry({_id:String(i),slug:`note-${i}`,title:`Note ${i}`}));const html=render(<Journal/>);expect((html.match(/class="journal-card"/g)||[])).toHaveLength(12);expect(html).toContain('Next');});
});
