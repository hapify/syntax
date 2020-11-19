import { ConverterReplacement, SyntaxConverter } from './SyntaxConverter';

export class ShortToLongConverter extends SyntaxConverter {
	protected replacers: ConverterReplacement[] = [
		{ search: /^\?\?$/, replace: 'else' },
		{ search: /^\?$/, replace: 'endif' },
		{ search: /^\?\?/, replace: 'elseif' },
		{ search: /^\?/, replace: 'if' },
		{ search: /^@$/, replace: 'endfor' },
		{ search: /^@/, replace: 'for' },

		{ search: /\ba-a$/, replace: 'kebab' },
		{ search: /\bA-A$/, replace: 'header' },
		{ search: /\ba_a$/, replace: 'snake' },
		{ search: /\bA_A$/, replace: 'constant' },
		{ search: /\baA$/, replace: 'camel' },
		{ search: /\bAA$/, replace: 'pascal' },
		{ search: /\baa$/, replace: 'compact' },
		{ search: /\ba$/, replace: 'lower' },
		{ search: /\bA$/, replace: 'capital' },
		{ search: /\bR$/, replace: 'raw', bypass: (inner) => /^(\?\?|\?|@|if|elseif|for)(\d+)?\s+/.test(inner) },

		{ search: /\s\//g, replace: ' not ' },
		{ search: /\s-/g, replace: ' not ' },
		{ search: /\*/g, replace: ' and ' },
		{ search: /\//g, replace: ' and not ' },
		{ search: /\+/g, replace: ' or ' },
		{ search: /-/g, replace: ' or not ' },

		{ search: /&&/g, replace: ' and ' },
		{ search: /\|\|/g, replace: ' or ' },
		{ search: /!/g, replace: ' not ' },

		{ search: /\bpr\b/g, replace: 'primary' },
		{ search: /\bun\b/g, replace: 'unique' },
		{ search: /\blb\b/g, replace: 'label' },
		{ search: /\bnu\b/g, replace: 'nullable' },
		{ search: /\bml\b/g, replace: 'multiple' },
		{ search: /\bem\b/g, replace: 'embedded' },
		{ search: /\bse\b/g, replace: 'searchable' },
		{ search: /\bso\b/g, replace: 'sortable' },
		{ search: /\bhd\b/g, replace: 'hidden' },
		{ search: /\bin\b/g, replace: 'internal' },
		{ search: /\brs\b/g, replace: 'restricted' },
		{ search: /\bos\b/g, replace: 'ownership' },

		{ search: /\btSe\b/g, replace: 'email' },
		{ search: /\btSp\b/g, replace: 'password' },
		{ search: /\btSu\b/g, replace: 'url' },
		{ search: /\btSt\b/g, replace: 'text' },
		{ search: /\btSr\b/g, replace: 'richText' },
		{ search: /\btS\b/g, replace: 'string' },
		{ search: /\btU\b/g, replace: 'enum' },
		{ search: /\btNi\b/g, replace: 'integer' },
		{ search: /\btNf\b/g, replace: 'float' },
		{ search: /\btNt\b/g, replace: 'latitude' },
		{ search: /\btNg\b/g, replace: 'longitude' },
		{ search: /\btN\b/g, replace: 'number' },
		{ search: /\btB\b/g, replace: 'boolean' },
		{ search: /\btDd\b/g, replace: 'date' },
		{ search: /\btDt\b/g, replace: 'time' },
		{ search: /\btD\b/g, replace: 'datetime' },
		{ search: /\btE\b/g, replace: 'entity' },
		{ search: /\btO\b/g, replace: 'object' },
		{ search: /\btFi\b/g, replace: 'image' },
		{ search: /\btFv\b/g, replace: 'video' },
		{ search: /\btFa\b/g, replace: 'audio' },
		{ search: /\btFd\b/g, replace: 'document' },
		{ search: /\btF\b/g, replace: 'file' },
		{ search: /\bpMHd\b/g, replace: 'mainlyHidden' },
		{ search: /\bpMIn\b/g, replace: 'mainlyInternal' },
		{ search: /\bpGeo\b/g, replace: 'isGeolocated' },
		{ search: /\bpGSe\b/g, replace: 'isGeoSearchable' },
		{ search: /\[ad\b/g, replace: 'gteAdmin' },
		{ search: /\[ow\b/g, replace: 'gteOwner' },
		{ search: /\[au\b/g, replace: 'gteAuth' },
		{ search: /\[gs\b/g, replace: 'gteGuest' },
		{ search: /\bad]/g, replace: 'lteAdmin' },
		{ search: /\bow]/g, replace: 'lteOwner' },
		{ search: /\bau]/g, replace: 'lteAuth' },
		{ search: /\bgs]/g, replace: 'lteGuest' },
		{ search: /\bad\b/g, replace: 'admin' },
		{ search: /\bow\b/g, replace: 'owner' },
		{ search: /\bau\b/g, replace: 'auth' },
		{ search: /\bgs\b/g, replace: 'guest' },
		{ search: /\bpOAd\b/g, replace: 'onlyAdmin' },
		{ search: /\bpOOw\b/g, replace: 'onlyOwner' },
		{ search: /\bpOAu\b/g, replace: 'onlyAuth' },
		{ search: /\bpOGs\b/g, replace: 'onlyGuest' },
		{ search: /\bpMAd\b/g, replace: 'maxAdmin' },
		{ search: /\bpMOw\b/g, replace: 'maxOwner' },
		{ search: /\bpMAu\b/g, replace: 'maxAuth' },
		{ search: /\bpMGs\b/g, replace: 'maxGuest' },
		{ search: /\bpNAd\b/g, replace: 'noAdmin' },
		{ search: /\bpNOw\b/g, replace: 'noOwner' },
		{ search: /\bpNAu\b/g, replace: 'noAuth' },
		{ search: /\bpNGs\b/g, replace: 'noGuest' },

		{ search: /\bM\b/g, replace: 'Model' },
		{ search: /\bF\b/g, replace: 'Fields' },
		{ search: /\bD\b/g, replace: 'Dependencies' },
		{ search: /\bR\b/g, replace: 'ReferencedIn' },
		{ search: /\bP\b/g, replace: 'PrimaryField' },
		{ search: /\bA\b/g, replace: 'Accesses' },
		{ search: /\bAc\b/g, replace: 'CreateAccess' },
		{ search: /\bAr\b/g, replace: 'ReadAccess' },
		{ search: /\bAu\b/g, replace: 'UpdateAccess' },
		{ search: /\bAd\b/g, replace: 'RemoveAccess' },
		{ search: /\bAs\b/g, replace: 'SearchAccess' },
		{ search: /\bAn\b/g, replace: 'CountAccess' },
	];

	protected cleanUp(inner: string): string {
		const newInner = inner.replace(/^for\s+Model(?!s)/gm, 'for Models');
		return super.cleanUp(newInner);
	}
}
